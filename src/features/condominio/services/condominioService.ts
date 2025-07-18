import { Condominio } from '../types';

const mockCondominios: Condominio[] = [
  { id: '1', nome: 'Residencial das Flores', cnpj: '11.222.333/0001-44', cidade: 'São Paulo', estado: 'SP' },
  { id: '2', nome: 'Condomínio Vista Verde', cnpj: '44.555.666/0001-77', cidade: 'Rio de Janeiro', estado: 'RJ' },
  { id: '3', nome: 'Edifício Central', cnpj: '77.888.999/0001-00', cidade: 'Belo Horizonte', estado: 'MG' },
];

const condominioService = {
  getCondominios: async (): Promise<Condominio[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCondominios;
  },
  // Futuras funções: createCondominio, updateCondominio, etc.
};

export default condominioService;