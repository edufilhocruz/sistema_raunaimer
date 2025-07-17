import { useState, useEffect } from 'react';
import { DashboardData } from '@/entities/dashboard/types';
import { MOCK_DASHBOARD_DATA } from '@/entities/dashboard/constants';

// Custom hook for dashboard data management
// Following clean architecture principles - separation of concerns
export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with loading state
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real application, this would be an API call
        setData(MOCK_DASHBOARD_DATA);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const refreshData = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setData({ ...MOCK_DASHBOARD_DATA });
  };

  return {
    data,
    loading,
    error,
    refreshData
  };
};