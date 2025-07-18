import { InadimplenciaItem } from '../types';

const mockInadimplencia: InadimplenciaItem[] = [
    { id: '1', morador: 'Carlos Pereira', unidade: 'A-102', condominio: 'Residencial das Flores', valor: 620.00, diasAtraso: 15, vencimento: '2025-07-03' },
    { id: '2', morador: 'Mariana Oliveira', unidade: 'D-401', condominio: 'Edifício Novo Horizonte', valor: 510.00, diasAtraso: 22, vencimento: '2025-06-26' },
    { id: '3', morador: 'João Mendes', unidade: 'B-303', condominio: 'Condomínio Vista Verde', valor: 750.00, diasAtraso: 45, vencimento: '2025-06-03' },
    { id: '4', morador: 'Lucas Pereira', unidade: 'Casa 202', condominio: 'Condomínio Vista Verde', valor: 620.00, diasAtraso: 8, vencimento: '2025-07-10' },
    { id: '5', morador: 'Beatriz Lima', unidade: 'C-201', condominio: 'Residencial das Flores', valor: 550.00, diasAtraso: 31, vencimento: '2025-06-17' },
];

const relatoriosService = {
  getInadimplenciaReport: async (): Promise<InadimplenciaItem[]> => {
    // Simula latência de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockInadimplencia;
  }
};

export default relatoriosService;