import { useState, useEffect, useCallback } from 'react';
import { DashboardData, DateRangeFilter } from '@/entities/dashboard/types';
import { MOCK_DASHBOARD_DATA, MOCK_DATA_CONDOMINIO_1, MOCK_DATA_CONDOMINIO_2, MOCK_DATA_7_DAYS, MOCK_DATA_14_DAYS } from '@/entities/dashboard/constants';

/**
 * Hook customizado para gerenciar a lógica de busca e filtragem dos dados do dashboard.
 * @param selectedCondominioId O ID do condomínio selecionado, ou 'todos'.
 * @param dateRange O período de tempo selecionado ('7d', '14d', '30d').
 */
export const useDashboardData = (selectedCondominioId: string = 'todos', dateRange: DateRangeFilter = '30d') => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async (condoId: string, range: DateRangeFilter) => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 400)); // Simula latência da rede
      
      // Em uma aplicação real, a API seria chamada com ambos os filtros:
      // const result = await api.get(`/dashboard?condominioId=${condoId}&range=${range}`);
      
      // Simulação da filtragem
      if (condoId === '1') {
        setData(MOCK_DATA_CONDOMINIO_1);
      } else if (condoId === '2') {
        setData(MOCK_DATA_CONDOMINIO_2);
      } else {
        // Se todos os condomínios estão selecionados, filtramos por data
        if (range === '7d') {
          setData(MOCK_DATA_7_DAYS);
        } else if (range === '14d') {
          setData(MOCK_DATA_14_DAYS);
        } else {
          setData(MOCK_DASHBOARD_DATA); // Padrão 30d
        }
      }

    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData(selectedCondominioId, dateRange);
  }, [selectedCondominioId, dateRange, fetchDashboardData]);

  return { data, loading, error };
};