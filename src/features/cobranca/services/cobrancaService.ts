import apiClient from '@/services/apiClient';

/**
 * Define a estrutura de dados necessária para a importação.
 */
interface ImportOptions {
  file: File;
  condominioId: string;
  modeloCartaId: string;
}

/**
 * Objeto de serviço para todas as operações relacionadas a cobranças.
 */
const cobrancaService = {
  /**
   * Envia uma planilha e os IDs associados para o backend para processamento em massa.
   * Utiliza FormData para enviar um arquivo e dados de texto na mesma requisição.
   * @param options Os dados da importação, incluindo o arquivo e os IDs.
   * @returns Uma promessa que resolve para a resposta da API (um sumário da operação).
   */
  importarPlanilha: async ({ file, condominioId, modeloCartaId }: ImportOptions) => {
    const formData = new FormData();
    formData.append('file', file); // 'file' corresponde ao nome no FileInterceptor do NestJS
    formData.append('condominioId', condominioId);
    formData.append('modeloCartaId', modeloCartaId);

    const response = await apiClient.post('/cobranca/importar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default cobrancaService;
