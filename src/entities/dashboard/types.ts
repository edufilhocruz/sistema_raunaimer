// Dashboard Domain Types - Clean Architecture Entities

export interface DashboardMetrics {
  totalCondominiums: number;
  totalDefaulters: number;
  monthlyCharges: number;
}

export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface EvolutionData {
  dataPoints: ChartDataPoint[];
  trend: 'up' | 'down' | 'stable';
}

export interface PaymentStats {
  paidPercentage: number;
  defaultPercentage: number;
  totalPayments: number;
}

export type ChargeStatus = 'sent' | 'paid' | 'overdue';

export interface RecentCharge {
  id: string;
  date: string;
  condominium: string;
  resident: string;
  value: string;
  status: ChargeStatus;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  evolution: EvolutionData;
  payments: PaymentStats;
  recentCharges: RecentCharge[];
}
export interface CondominiumChargeStatus {
  id: string;
  name: string;
  chargesSent: number;
  totalUnits: number;
}

// Atualizamos DashboardData para incluir a nova lista
export interface DashboardData {
  metrics: DashboardMetrics;
  evolution: EvolutionData;
  payments: PaymentStats;
  recentCharges: RecentCharge[];
  condominiumStatus: CondominiumChargeStatus[]; // NOVO CAMPO
}
export type DateRangeFilter = '7d' | '14d' | '30d';