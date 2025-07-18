import { Morador } from '../types';

const mockMoradores: Morador[] = [
  { id: '1', nome: 'Sofia Almeida', email: 'sofia@email.com', unidade: 'A-101', condominioId: '1', condominioNome: 'Residencial das Flores' },
  { id: '2', nome: 'Carlos Pereira', email: 'carlos@email.com', unidade: 'A-102', condominioId: '1', condominioNome: 'Residencial das Flores' },
  { id: '3', nome: 'Ana Costa', email: 'ana@email.com', unidade: 'Casa 201', condominioId: '2', condominioNome: 'Condomínio Vista Verde' },
  { id: '4', nome: 'Ricardo Santos', email: 'ricardo@email.com', unidade: 'Casa 202', condominioId: '2', condominioNome: 'Condomínio Vista Verde' },
];

const moradorService = {
  getMoradores: async (): Promise<Morador[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMoradores;
  },
  // Funções de criar, atualizar e deletar seriam implementadas aqui
};

export default moradorService;