import { DashboardData, ChargeStatus, CondominiumChargeStatus } from './types';

//================================== CONFIGURAÇÕES GERAIS ==================================

export const CHART_MONTHS = ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] as const;

export const STATUS_CONFIG: Record<ChargeStatus, {
  label: string;
  className: string;
  color: string;
}> = {
  sent: { label: 'Enviado', className: 'status-badge info', color: 'hsl(var(--info))' },
  paid: { label: 'Pago', className: 'status-badge success', color: 'hsl(var(--success))' },
  overdue: { label: 'Atrasado', className: 'status-badge danger', color: 'hsl(var(--danger))' }
};

// Lista completa de condomínios para o filtro (pode ser compartilhada)
const allCondominiumStatus: CondominiumChargeStatus[] = [
    { id: '1', name: 'Residencial das Flores', chargesSent: 20, totalUnits: 30 },
    { id: '2', name: 'Condomínio Vista Verde', chargesSent: 15, totalUnits: 18 },
    { id: '3', name: 'Edifício Central', chargesSent: 50, totalUnits: 50 },
    { id: '4', name: 'Parque das Águas', chargesSent: 25, totalUnits: 40 },
];

//================================== DADOS SIMULADOS (MOCKS) ==================================

/**
 * DADOS GERAIS (QUANDO "TODOS OS CONDOMÍNIOS" ESTÁ SELECIONADO)
 */
export const MOCK_DASHBOARD_DATA: DashboardData = {
  metrics: { totalCondominiums: 4, totalDefaulters: 42, monthlyCharges: 110 },
  evolution: { dataPoints: [ { month: 'Jul', value: 45 }, { month: 'Ago', value: 52 }, { month: 'Set', value: 38 }, { month: 'Out', value: 65 }, { month: 'Nov', value: 48 }, { month: 'Dez', value: 72 } ], trend: 'up' },
  payments: { paidPercentage: 70, defaultPercentage: 30, totalPayments: 234 },
  recentCharges: [
    { id: '1', date: '05/01/2024', condominium: 'Residencial das Flores', resident: 'Carlos Silva', value: 'R$ 550,00', status: 'sent' },
    { id: '2', date: '03/01/2024', condominium: 'Edifício Sol Nascente', resident: 'Ana Souza', value: 'R$ 620,00', status: 'paid' },
    { id: '3', date: '02/01/2024', condominium: 'Condomínio Vista Alegre', resident: 'Roberto Almeida', value: 'R$ 480,00', status: 'sent' },
  ],
  condominiumStatus: allCondominiumStatus
};

/**
 * DADOS FILTRADOS PARA O CONDOMÍNIO 1 (RESIDENCIAL DAS FLORES)
 * Agora é um objeto completo e independente.
 */
export const MOCK_DATA_CONDOMINIO_1: DashboardData = {
  metrics: { totalCondominiums: 1, totalDefaulters: 8, monthlyCharges: 20 },
  evolution: { dataPoints: [ { month: 'Jul', value: 5 }, { month: 'Ago', value: 7 }, { month: 'Set', value: 4 }, { month: 'Out', value: 8 }, { month: 'Nov', value: 6 }, { month: 'Dez', value: 8 } ], trend: 'up' },
  payments: { paidPercentage: 85, defaultPercentage: 15, totalPayments: 150 },
  recentCharges: [
     { id: '1', date: '05/01/2024', condominium: 'Residencial das Flores', resident: 'Carlos Silva', value: 'R$ 550,00', status: 'sent' },
     { id: '4', date: '30/12/2023', condominium: 'Residencial das Flores', resident: 'Mariana Costa', value: 'R$ 550,00', status: 'paid' },
  ],
  condominiumStatus: allCondominiumStatus,
};

/**
 * DADOS FILTRADOS PARA O CONDOMÍNIO 2 (VISTA VERDE)
 * Agora é um objeto completo e independente.
 */
export const MOCK_DATA_CONDOMINIO_2: DashboardData = {
  metrics: { totalCondominiums: 1, totalDefaulters: 3, monthlyCharges: 15 },
  evolution: { dataPoints: [ { month: 'Jul', value: 2 }, { month: 'Ago', value: 1 }, { month: 'Set', value: 3 }, { month: 'Out', value: 2 }, { month: 'Nov', value: 4 }, { month: 'Dez', value: 3 } ], trend: 'stable' },
  payments: { paidPercentage: 92, defaultPercentage: 8, totalPayments: 84 },
  recentCharges: [
     { id: '3', date: '02/01/2024', condominium: 'Condomínio Vista Alegre', resident: 'Roberto Almeida', value: 'R$ 480,00', status: 'sent' },
  ],
  condominiumStatus: allCondominiumStatus,
};
export const MOCK_DATA_7_DAYS: DashboardData = {
  ...MOCK_DASHBOARD_DATA,
  metrics: { totalCondominiums: 4, totalDefaulters: 12, monthlyCharges: 35 },
  evolution: { dataPoints: [ { month: 'Dia 1', value: 5 }, { month: 'Dia 3', value: 8 }, { month: 'Dia 7', value: 12 } ], trend: 'up' },
  payments: { paidPercentage: 95, defaultPercentage: 5, totalPayments: 102 },
};

// DADOS SIMULADOS PARA 14 DIAS
export const MOCK_DATA_14_DAYS: DashboardData = {
  ...MOCK_DASHBOARD_DATA,
  metrics: { totalCondominiums: 4, totalDefaulters: 25, monthlyCharges: 70 },
  evolution: { dataPoints: [ { month: 'Sem 1', value: 20 }, { month: 'Sem 2', value: 25 } ], trend: 'stable' },
  payments: { paidPercentage: 88, defaultPercentage: 12, totalPayments: 180 },
};