import { DashboardData, ChargeStatus } from './types';

// Domain Constants and Mock Data
export const CHART_MONTHS = ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] as const;

export const STATUS_CONFIG: Record<ChargeStatus, {
  label: string;
  className: string;
  color: string;
}> = {
  sent: {
    label: 'Enviado',
    className: 'status-badge info',
    color: 'hsl(var(--info))'
  },
  paid: {
    label: 'Pago',
    className: 'status-badge success',
    color: 'hsl(var(--success))'
  },
  overdue: {
    label: 'Atrasado',
    className: 'status-badge danger',
    color: 'hsl(var(--danger))'
  }
};

// Mock Data - In a real app, this would come from API
export const MOCK_DASHBOARD_DATA: DashboardData = {
  metrics: {
    totalCondominiums: 15,
    totalDefaulters: 42,
    monthlyCharges: 120
  },
  evolution: {
    dataPoints: [
      { month: 'Jul', value: 45 },
      { month: 'Ago', value: 52 },
      { month: 'Set', value: 38 },
      { month: 'Out', value: 65 },
      { month: 'Nov', value: 48 },
      { month: 'Dez', value: 72 }
    ],
    trend: 'up'
  },
  payments: {
    paidPercentage: 70,
    defaultPercentage: 30,
    totalPayments: 234
  },
  recentCharges: [
    {
      id: '1',
      date: '05/01/2024',
      condominium: 'Residencial das Flores',
      resident: 'Carlos Silva',
      value: 'R$ 550,00',
      status: 'sent'
    },
    {
      id: '2',
      date: '03/01/2024',
      condominium: 'Edifício Sol Nascente',
      resident: 'Ana Souza',
      value: 'R$ 620,00',
      status: 'paid'
    },
    {
      id: '3',
      date: '02/01/2024',
      condominium: 'Condomínio Vista Alegre',
      resident: 'Roberto Almeida',
      value: 'R$ 480,00',
      status: 'sent'
    },
    {
      id: '4',
      date: '30/12/2023',
      condominium: 'Residencial das Flores',
      resident: 'Mariana Costa',
      value: 'R$ 550,00',
      status: 'paid'
    },
    {
      id: '5',
      date: '28/12/2023',
      condominium: 'Edifício Sol Nascente',
      resident: 'Lucas Pereira',
      value: 'R$ 620,00',
      status: 'overdue'
    }
  ]
};