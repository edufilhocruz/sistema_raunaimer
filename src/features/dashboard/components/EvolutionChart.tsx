import { EvolutionData } from '@/entities/dashboard/types';
import { useCharts } from '../hooks/useCharts';
import { useIntersectionAnimation } from '@/shared/hooks/useAnimation';
import { CHART_MONTHS } from '@/entities/dashboard/constants';

interface EvolutionChartProps {
  data: EvolutionData | undefined;
  loading?: boolean;
}

export const EvolutionChart = ({ data, loading }: EvolutionChartProps) => {
  const { evolutionChart, insights } = useCharts(data, undefined);
  const { ref, isVisible } = useIntersectionAnimation();

  if (loading) {
    return (
      <div className="lg:col-span-2 card-enhanced animate-pulse">
        <div className="p-6">
          <div className="h-6 bg-border rounded mb-4 w-48"></div>
          <div className="h-80 bg-border rounded"></div>
        </div>
      </div>
    );
  }

  if (!evolutionChart) return null;

  return (
    <div 
      ref={ref} 
      className={`lg:col-span-2 card-enhanced transition-all duration-700 ${
        isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Evolução da Inadimplência
          </h3>
          {insights && (
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              insights.trend === 'improving' ? 'bg-success-light text-success' :
              insights.trend === 'declining' ? 'bg-danger-light text-danger' :
              'bg-info-light text-info'
            }`}>
              {insights.improvement > 0 ? '+' : ''}{insights.improvement}%
            </div>
          )}
        </div>
        
        <div className="h-80 relative">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 500 300" 
            preserveAspectRatio="xMidYMid meet"
            className="overflow-visible"
          >
            {/* Grid lines */}
            <defs>
              <linearGradient id={evolutionChart.gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary-gold))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--primary-gold))" stopOpacity="0" />
              </linearGradient>
              
              {/* Animated line gradient */}
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary-gold))">
                  {isVisible && (
                    <animate attributeName="stop-opacity" values="0;1" dur="1.5s" fill="freeze" />
                  )}
                </stop>
                <stop offset="100%" stopColor="hsl(var(--primary-gold-dark))">
                  {isVisible && (
                    <animate attributeName="stop-opacity" values="0;1" dur="1.5s" begin="0.5s" fill="freeze" />
                  )}
                </stop>
              </linearGradient>
            </defs>

            {/* Grid */}
            <g className="opacity-20">
              <path d="M40 250 H 460" stroke="hsl(var(--border))" strokeWidth="1" />
              <path d="M40 250 L 40 50" stroke="hsl(var(--border))" strokeWidth="1" />
              {evolutionChart.yAxisLabels.map((label, index) => (
                <g key={index}>
                  <path 
                    d={`M40 ${250 - (index * 40)} H 460`} 
                    stroke="hsl(var(--border))" 
                    strokeWidth="0.5" 
                    strokeDasharray="2,2"
                  />
                </g>
              ))}
            </g>
            
            {/* Y-axis labels */}
            <g className="text-xs fill-text-muted">
              {evolutionChart.yAxisLabels.map((label, index) => (
                <text key={index} textAnchor="end" x="30" y={255 - (index * 40)}>
                  {label}
                </text>
              ))}
            </g>
            
            {/* X-axis labels */}
            <g className="text-xs fill-text-muted">
              {CHART_MONTHS.map((month, index) => (
                <text key={month} textAnchor="middle" x={80 + (index * 70)} y="270">
                  {month}
                </text>
              ))}
            </g>
            
            {/* Area fill */}
            <path 
              d={`M80,180 L150,150 L220,170 L290,120 L360,140 L430,100 L430,250 L80,250 Z`} 
              fill={`url(#${evolutionChart.gradientId})`}
              className={isVisible ? 'animate-scale-in' : 'scale-95 opacity-0'}
              style={{ transformOrigin: 'center bottom' }}
            />
            
            {/* Animated line */}
            <polyline 
              fill="none" 
              points="80,180 150,150 220,170 290,120 360,140 430,100" 
              stroke="url(#lineGradient)"
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="3"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
              className={isVisible ? '' : 'opacity-0'}
            >
              {isVisible && (
                <animate
                  attributeName="stroke-dashoffset"
                  values="1;0"
                  dur="2s"
                  fill="freeze"
                />
              )}
            </polyline>

            {/* Data points */}
            {data?.dataPoints.map((point, index) => (
              <circle
                key={index}
                cx={80 + (index * 70)}
                cy={[180, 150, 170, 120, 140, 100][index]}
                r="4"
                fill="hsl(var(--primary-gold))"
                className={isVisible ? 'animate-scale-in' : 'scale-0'}
                style={{ 
                  animationDelay: `${1.5 + index * 0.1}s`,
                  transformOrigin: 'center'
                }}
              >
                <title>{point.month}: {point.value}</title>
              </circle>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};