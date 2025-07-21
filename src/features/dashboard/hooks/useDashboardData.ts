import { useState, useEffect, useCallback } from 'react';
import { DashboardData, DateRangeFilter } from '@/entities/dashboard/types';
import { MOCK_DASHBOARD_DATA, MOCK_DATA_CONDOMINIO_1, MOCK_DATA_CONDOMINIO_2, MOCK_DATA_7_DAYS, MOCK_DATA_14_DAYS, MOCK_DATA_TODAY, MOCK_DATA_3_DAYS } from '@/entities/dashboard/constants';

export const useDashboardData = (selectedCondominioId: string = 'todos', dateRange: DateRangeFilter = '30d') => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async (condoId: string, range: DateRangeFilter) => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Simulação da filtragem
      if (condoId !== 'todos') {
        // Lógica para condomínio específico (simplificada)
        setData(condoId === '1' ? MOCK_DATA_CONDOMINIO_1 : MOCK_DATA_CONDOMINIO_2);
      } else {
        // Lógica para o filtro de período
        switch (range) {
          case 'hoje':
            setData(MOCK_DATA_TODAY);
            break;
          case '3d':
            setData(MOCK_DATA_3_DAYS);
            break;
          case '7d':
            setData(MOCK_DATA_7_DAYS);
            break;
          case '14d':
            setData(MOCK_DATA_14_DAYS);
            break;
          default:
            setData(MOCK_DASHBOARD_DATA);
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