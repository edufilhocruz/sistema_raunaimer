/**
 * O status de uma cobrança. Usamos um 'union type' para garantir
 * que apenas valores válidos sejam utilizados no sistema.
 */
export type CobrancaStatus = 'Pago' | 'Atrasado' | 'Em Aberto';

/**
 * Representa uma única entrada no histórico de cobranças.
 * Esta é a entidade principal para nosso relatório.
 */
export interface HistoricoCobranca {
  id: string;
  morador: string;
  condominio: string;
  valor: number;
  dataEnvio: string; // Utilizaremos o formato ISO 8601 (ex: '2025-07-15T10:30:00Z') para consistência
  status: CobrancaStatus;
}

/**
 * Agrega os Key Performance Indicators (KPIs) calculados
 * para exibição nos cartões de métricas do relatório.
 */
export interface CobrancasKpis {
  totalArrecadado: number;
  totalPendente: number;
  taxaSucesso: number; // Armazenado como um valor de 0 a 100
}