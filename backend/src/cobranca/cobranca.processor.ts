import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import * as XLSX from 'xlsx';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Interface para definir a estrutura de dados do trabalho (job) que a fila recebe.
 * Garante a segurança de tipos entre o controller e o worker.
 */
interface ImportJobData {
  fileBuffer: Buffer;
  condominioId: string;
  modeloCartaId: string;
}

/**
 * CobrancaProcessor (Worker)
 *
 * Esta classe é responsável por processar trabalhos pesados em segundo plano.
 * Ela "ouve" a fila 'import-cobranca' e executa a lógica de importação
 * de planilhas de forma assíncrona, sem bloquear a API principal.
 */
@Processor('import-cobranca')
export class CobrancaProcessor {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Processa um trabalho de importação de arquivo.
   * @param job O objeto do trabalho, contendo o buffer do arquivo e os IDs necessários.
   * @returns Um sumário da operação com o total de sucessos e uma lista de erros.
   */
  @Process('process-file')
  async handleImport(job: Job<ImportJobData>) {
    console.log(`WORKER: Iniciando processamento do Job ID: ${job.id}...`);
    const { fileBuffer, condominioId, modeloCartaId } = job.data;
    
    let sucesso = 0;
    const detalhesErros: string[] = [];

    try {
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json<any>(worksheet, {
        header: ["nome", "email", "bloco", "apto", "valor"],
        defval: null // Garante que células vazias sejam nulas
      });

      // Pula a primeira linha (cabeçalho)
      const dataRows = data.slice(1);

      for (const [index, row] of dataRows.entries()) {
        const linha = index + 2; // +2 porque o índice é base 0 e pulamos a linha de cabeçalho
        
        try {
          // Validação robusta da linha
          if (!row.nome || !row.email || !row.bloco || !row.apto || row.valor == null) {
            throw new Error('Todos os campos (Nome, Email, Bloco, Apto, Valor) são obrigatórios.');
          }

          // Busca por um morador existente ou cria um novo (upsert)
          const morador = await this.prisma.morador.upsert({
            where: { email: row.email },
            update: {}, // Não faz nada se o morador já existe
            create: {
              nome: row.nome,
              email: row.email,
              bloco: String(row.bloco),
              apartamento: String(row.apto),
              telefone: '(00) 00000-0000', // Telefone placeholder
              condominioId: condominioId, // ID Dinâmico
            },
          });

          // Cria a cobrança associada ao morador
          await this.prisma.cobranca.create({
            data: {
              valor: Number(row.valor),
              vencimento: new Date(), // Vencimento placeholder, pode ser adicionado à planilha
              status: 'PENDENTE',
              condominioId: condominioId, // ID Dinâmico
              moradorId: morador.id,
              modeloCartaId: modeloCartaId, // ID Dinâmico
            },
          });
          sucesso++;
        } catch (error) {
          // Captura erros por linha, permitindo que o resto do arquivo continue
          detalhesErros.push(`Linha ${linha}: ${error.message}`);
        }
      }
    } catch (error) {
        console.error("WORKER: Erro crítico ao processar o arquivo", error);
        return { message: "Falha geral ao ler ou processar o arquivo.", sucesso, erros: detalhesErros.length, detalhesErros };
    }
    console.log(`WORKER: Processamento concluído para o Job ID: ${job.id}. Sucesso: ${sucesso}, Erros: ${detalhesErros.length}`);
    return { message: "Processamento concluído.", sucesso, erros: detalhesErros.length, detalhesErros };
  }
}
