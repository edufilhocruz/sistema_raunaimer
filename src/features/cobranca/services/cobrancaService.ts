import { HistoricoCobranca } from '../types';

// Mock de dados que simula a resposta de uma futura API.
const mockCobrancas: HistoricoCobranca[] = [
  { id: '1', morador: 'Sofia Almeida', condominio: 'Residencial das Flores', valor: 550.00, dataEnvio: '2025-07-15T10:30:00Z', status: 'Pago' },
  { id: '2', morador: 'Carlos Pereira', condominio: 'Edifício Central', valor: 620.00, dataEnvio: '2025-07-14T14:15:00Z', status: 'Atrasado' },
  { id: '3', morador: 'Ana Costa', condominio: 'Condomínio Verde', valor: 480.00, dataEnvio: '2025-07-13T09:45:00Z', status: 'Em Aberto' },
  { id: '4', morador: 'Ricardo Santos', condominio: 'Residencial das Palmeiras', valor: 590.00, dataEnvio: '2025-07-12T16:00:00Z', status: 'Pago' },
  { id: '5', morador: 'Mariana Oliveira', condominio: 'Edifício Novo Horizonte', valor: 510.00, dataEnvio: '2025-07-11T11:20:00Z', status: 'Atrasado' },
];


/**
 * Interface que define o contrato do serviço de cobrança.
 * Isso é útil para testes e para garantir a consistência da implementação.
 */
interface ICobrancaService {
  getHistoricoCobrancas(): Promise<HistoricoCobranca[]>;
}

/**
 * Implementação do serviço.
 * A responsabilidade dele é unicamente buscar os dados.
 */
const cobrancaService: ICobrancaService = {
  getHistoricoCobrancas: async (): Promise<HistoricoCobranca[]> => {
    console.log('Buscando dados do histórico de cobranças...');
    // Simula a latência de uma chamada de rede real
    await new Promise(resolve => setTimeout(resolve, 800));
    // No futuro, aqui teremos a chamada real usando o apiClient:
    // const { data } = await apiClient.get('/cobrancas/historico');
    // return data;
    return mockCobrancas;
  }
};

export default cobrancaService;