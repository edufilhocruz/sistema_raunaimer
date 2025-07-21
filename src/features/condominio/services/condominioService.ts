import { Condominio, CondominioFormData } from '../types';
import apiClient from '@/services/apiClient';

const condominioService = {
  /**
   * Busca a lista de todos os condomínios da API.
   */
  getCondominios: async (): Promise<Condominio[]> => {
    const response = await apiClient.get<Condominio[]>('/condominio');
    return response.data;
  },

  /**
   * NOVO: Envia os dados de um novo condomínio para a API para criação.
   * @param data Os dados do formulário do novo condomínio.
   * @returns O objeto do condomínio criado pela API.
   */
  createCondominio: async (data: CondominioFormData): Promise<Condominio> => {
    const response = await apiClient.post<Condominio>('/condominio', data);
    return response.data;
  },
};

export default condominioService;
