import apiClient from '@/services/apiClient';
import { DashboardData } from '@/entities/dashboard/types';
import { MOCK_DASHBOARD_DATA } from '@/entities/dashboard/constants';

// Interface para definir o contrato do serviço
interface IDashboardService {
  getDashboardData(): Promise<DashboardData>;
}

// Implementação do serviço
const dashboardService: IDashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    try {
      // QUANDO A API ESTIVER PRONTA, USAREMOS A LINHA ABAIXO:
      // const response = await apiClient.get<DashboardData>('/dashboard');
      // return response.data;

      // POR ENQUANTO, SIMULAMOS A API E RETORNAMOS OS DADOS MOCKADOS:
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula a latência da rede
      
      if (Math.random() < 0.1) { // Simula um erro de rede em 10% das vezes
         throw new Error("Falha na simulação de rede.");
      }
      
      return MOCK_DASHBOARD_DATA;

    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
      // Lançamos o erro para que a camada superior (o hook) possa tratá-lo.
      throw new Error('Não foi possível carregar os dados do dashboard.');
    }
  },
};

export default dashboardService;