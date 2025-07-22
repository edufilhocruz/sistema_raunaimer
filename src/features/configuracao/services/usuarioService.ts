import { Usuario } from '../types';
import apiClient from '@/services/apiClient';

const usuarioService = {
  getUsuarios: async (): Promise<Usuario[]> => {
    const response = await apiClient.get<Usuario[]>('/usuarios');
    return response.data;
  },
  createUsuario: async (data: any): Promise<Usuario> => {
    const response = await apiClient.post<Usuario>('/usuarios', data);
    return response.data;
  },
  updateUsuario: async (id: string, data: any): Promise<Usuario> => {
    const response = await apiClient.patch<Usuario>(`/usuarios/${id}`, data);
    return response.data;
  },
  deleteUsuario: async (id: string): Promise<void> => {
    await apiClient.delete(`/usuarios/${id}`);
  },
  getPermissoes: async (): Promise<any[]> => {
    const response = await apiClient.get<any[]>('/permissoes');
    return response.data;
  },
};

export default usuarioService;