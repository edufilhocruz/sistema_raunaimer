import { Usuario } from '../types';

const mockUsuarios: Usuario[] = [
  { id: '1', nome: 'Eduardo Cruz', email: 'admin@raunaimer.com', role: 'Admin', status: 'Ativo' },
  { id: '2', nome: 'Alice Siqueira', email: 'alice@raunaimer.com', role: 'Operador', status: 'Ativo' },
  { id: '3', nome: 'Bruno Costa', email: 'bruno@raunaimer.com', role: 'Operador', status: 'Inativo' },
];

const usuarioService = {
  getUsuarios: async (): Promise<Usuario[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsuarios;
  },
};

export default usuarioService;