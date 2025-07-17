import { DashboardMetrics } from '@/entities/dashboard/types';
import { useMetrics } from '../hooks/useMetrics';
import { useStaggeredAnimation } from '@/shared/hooks/useAnimation';
import { NumberFormatter } from '@/shared/libs/format-utils';

interface MetricsSectionProps {
  metrics: DashboardMetrics | undefined;
  loading?: boolean;
}

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  trend?: string;
  isVisible?: boolean;
}

const MetricCard = ({ title, value, suffix = '', trend, isVisible = true }: MetricCardProps) => (
  <div 
    className={`card-enhanced transition-all duration-500 ${
      isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-4'
    }`}
  >
    <div className="p-6">
      <h3 className="text-base font-medium text-text-secondary mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-foreground">
          {value.toLocaleString('pt-BR')}{suffix}
        </p>
        {trend && (
          <span className="text-sm font-medium text-success">
            {trend}
          </span>
        )}
      </div>
    </div>
  </div>
);

export const MetricsSection = ({ metrics, loading }: MetricsSectionProps) => {
  const { animatedValues, calculated } = useMetrics(metrics, !loading);
  const { ref, visibleItems } = useStaggeredAnimation(3, 150);

  if (loading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="card-enhanced animate-pulse">
            <div className="p-6">
              <div className="h-4 bg-border rounded mb-2"></div>
              <div className="h-8 bg-border rounded"></div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Total de Condomínios"
        value={animatedValues.condominiums}
        trend={calculated?.growth.condominiums}
        isVisible={visibleItems.includes(0)}
      />
      <MetricCard
        title="Total de Inadimplentes"
        value={animatedValues.defaulters}
        isVisible={visibleItems.includes(1)}
      />
      <MetricCard
        title="Cobranças Enviadas (Mês)"
        value={animatedValues.charges}
        trend={calculated?.growth.charges}
        isVisible={visibleItems.includes(2)}
      />
    </section>
  );
};