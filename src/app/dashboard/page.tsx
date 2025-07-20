'use client';

import { useState } from 'react';
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricsSection } from "@/features/dashboard/components/MetricsSection";
import { EvolutionChart } from "@/features/dashboard/components/EvolutionChart";
import { PaymentChart } from "@/features/dashboard/components/PaymentChart";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";
import { DashboardFilters } from "@/features/dashboard/components/DashboardFilters";
import { CondominiumStatusList } from "@/features/dashboard/components/CondominiumStatusList";
import { MOCK_DASHBOARD_DATA } from '@/entities/dashboard/constants';
import { RecentChargesTable } from '@/features/dashboard/components/RecentChargesTable';
import { DateRangeFilter } from '@/entities/dashboard/types';

export const DashboardPage = () => {
  const [selectedCondominioId, setSelectedCondominioId] = useState('todos');
  const [dateRange, setDateRange] = useState<DateRangeFilter>('30d');

  const { data, loading, error } = useDashboardData(selectedCondominioId, dateRange);

  const allCondominios = MOCK_DASHBOARD_DATA.condominiumStatus || [];

  if (error) { /* ... (código de erro existente) ... */ }

  return (
    <div className="flex h-screen bg-bg-secondary">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Visão Geral" />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <ErrorBoundary>
            <DashboardFilters 
              condominios={allCondominios}
              onCondominioChange={setSelectedCondominioId} 
              onDateRangeChange={setDateRange}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <MetricsSection metrics={data?.metrics} loading={loading} />
          </ErrorBoundary>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ErrorBoundary>
              <EvolutionChart data={data?.evolution} loading={loading} />
            </ErrorBoundary>
            <ErrorBoundary>
              <PaymentChart data={data?.payments} loading={loading} />
            </ErrorBoundary>
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <ErrorBoundary>
                <CondominiumStatusList data={data?.condominiumStatus || []} loading={loading} />
             </ErrorBoundary>
             <ErrorBoundary>
               <RecentChargesTable />
             </ErrorBoundary>
          </section>
        </div>
      </main>
    </div>
  );
};