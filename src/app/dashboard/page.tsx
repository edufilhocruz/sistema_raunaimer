import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricsSection } from "@/features/dashboard/components/MetricsSection";
import { EvolutionChart } from "@/features/dashboard/components/EvolutionChart";
import { PaymentChart } from "@/features/dashboard/components/PaymentChart";
import { RecentChargesTable } from "@/features/dashboard/components/RecentChargesTable";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";

/**
 * Documentação: DashboardPage
 * Esta é a página principal do dashboard.
 * - Orquestra todos os componentes do dashboard.
 * - Utiliza o hook `useDashboardData` para buscar e gerenciar os dados.
 * - Passa os dados para os componentes filhos (`MetricsSection`, `EvolutionChart`, etc.).
 * - Gerencia os estados de carregamento e erro para toda a página.
 */
export const DashboardPage = () => {
  const { data, loading, error } = useDashboardData();

  // Tratamento de erro centralizado
  if (error) {
    return (
      <div className="flex h-screen bg-bg-secondary">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Erro ao carregar dashboard</h3>
            <p className="text-text-muted">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg-secondary">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Visão Geral" />
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <ErrorBoundary>
            <MetricsSection metrics={data?.metrics} loading={loading} />
          </ErrorBoundary>
          
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ErrorBoundary>
              <EvolutionChart data={data?.evolution} loading={loading} />
            </ErrorBoundary>
            <ErrorBoundary>
              {/* Passando os dados corretos como 'data' para o PaymentChart */}
              <PaymentChart data={data?.payments} loading={loading} />
            </ErrorBoundary>
          </section>
          
          <ErrorBoundary>
            {/* O estado de 'loading' também se aplica à tabela */}
            {loading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <RecentChargesTable />
            )}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};