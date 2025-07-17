import { PaymentStats } from '@/entities/dashboard/types';
import { useCharts } from '../hooks/useCharts';
import { useIntersectionAnimation } from '@/shared/hooks/useAnimation';

interface PaymentChartProps {
  data: PaymentStats | undefined;
  loading?: boolean;
}

export const PaymentChart = ({ data, loading }: PaymentChartProps) => {
  const { paymentChart } = useCharts(undefined, data);
  const { ref, isVisible } = useIntersectionAnimation();

  if (loading) {
    return (
      <div className="card-enhanced animate-pulse">
        <div className="p-6">
          <div className="h-6 bg-border rounded mb-4 w-48"></div>
          <div className="h-48 bg-border rounded"></div>
        </div>
      </div>
    );
  }

  if (!paymentChart) return null;

  return (
    <div ref={ref} className={`card-enhanced transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Proporção de Pagamentos</h3>
        
        <div className="flex items-center justify-center mb-6">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={paymentChart.radius} fill="hsl(var(--chart-secondary))" />
            <circle
              cx="100" cy="100" r={paymentChart.radius} fill="transparent"
              stroke="hsl(var(--primary-gold))" strokeWidth="20"
              strokeDasharray={paymentChart.strokeDasharray}
              strokeDashoffset={paymentChart.strokeDashoffset}
              transform="rotate(-90 100 100)"
              className={isVisible ? 'animate-scale-in' : 'scale-0'}
            />
            <text className="text-4xl font-bold fill-foreground" textAnchor="middle" x="100" y="105">
              {paymentChart.centerText}
            </text>
            <text className="text-sm fill-text-muted" textAnchor="middle" x="100" y="130">
              {paymentChart.subtitle}
            </text>
          </svg>
        </div>
        
        <div className="flex justify-around text-sm">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-gold"></span>
            <span>Pagos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-chart-secondary"></span>
            <span>Inadimplentes</span>
          </div>
        </div>
      </div>
    </div>
  );
};