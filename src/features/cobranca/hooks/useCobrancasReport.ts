import { useState, useEffect, useMemo, useCallback } from 'react';
import { HistoricoCobranca, CobrancasKpis } from '../types';
import cobrancaService from '../services/cobrancaService';

/**
 * Hook customizado para gerenciar a lógica e o estado do Relatório de Cobranças.
 * É o "cérebro" da nossa feature.
 */
export const useCobrancasReport = () => {
  const [data, setData] = useState<HistoricoCobranca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReportData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const reportData = await cobrancaService.getHistoricoCobrancas();
      setData(reportData);
    } catch (err) {
      setError('Falha ao carregar o histórico de cobranças.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  // `useMemo` garante que os KPIs só sejam recalculados quando os dados mudarem,
  // otimizando a performance.
  const kpis = useMemo<CobrancasKpis | null>(() => {
    if (!data || data.length === 0) return null;

    const totalArrecadado = data
      .filter(c => c.status === 'Pago')
      .reduce((acc, item) => acc + item.valor, 0);

    const totalPendente = data
      .filter(c => c.status !== 'Pago')
      .reduce((acc, item) => acc + item.valor, 0);

    const totalCobrancas = data.length;
    const cobrancasPagas = data.filter(c => c.status === 'Pago').length;
    const taxaSucesso = totalCobrancas > 0 ? (cobrancasPagas / totalCobrancas) * 100 : 0;

    return { totalArrecadado, totalPendente, taxaSucesso };
  }, [data]);

  return {
    data,
    kpis,
    loading,
    error,
    refresh: fetchReportData // Expomos uma função para recarregar os dados
  };
};