import { Morador } from '../types';

const mockMoradores: Morador[] = [
  { id: '1', nome: 'Sofia Almeida', email: 'sofia@email.com', bloco: 'A', apartamento: '101', telefone: '(11) 98765-4321', statusPagamento: 'Em dia', condominioNome: 'Residencial das Flores' },
  { id: '2', nome: 'Carlos Pereira', email: 'carlos@email.com', bloco: 'A', apartamento: '102', telefone: '(21) 91234-5678', statusPagamento: 'Atrasado', condominioNome: 'Residencial das Flores' },
  { id: '3', nome: 'Ana Costa', email: 'ana@email.com', bloco: 'Único', apartamento: '201', telefone: '(31) 95555-4444', statusPagamento: 'Em dia', condominioNome: 'Condomínio Vista Verde' },
  { id: '4', nome: 'Ricardo Santos', email: 'ricardo@email.com', bloco: 'B', apartamento: '302', telefone: '(41) 93333-2222', statusPagamento: 'Pendente', condominioNome: 'Edifício Central' },
];

const moradorService = {
  getMoradores: async (): Promise<Morador[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMoradores;
  },
};

export default moradorService;