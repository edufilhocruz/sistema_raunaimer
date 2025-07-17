export function EvolutionChart() {
  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm lg:col-span-2">
      <h3 className="text-lg font-semibold text-foreground mb-4">Evolução da Inadimplência</h3>
      
      <div className="h-80">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 500 300" 
          preserveAspectRatio="xMidYMid meet"
          className="overflow-visible"
        >
          {/* Grid lines */}
          <path d="M40 250 H 460" stroke="hsl(var(--border))" strokeWidth="2" />
          <path d="M40 250 L 40 50" stroke="hsl(var(--border))" strokeWidth="2" />
          
          {/* Y-axis labels */}
          <g className="text-xs fill-text-muted">
            <text textAnchor="end" x="30" y="250">0</text>
            <text textAnchor="end" x="30" y="200">20</text>
            <text textAnchor="end" x="30" y="150">40</text>
            <text textAnchor="end" x="30" y="100">60</text>
            <text textAnchor="end" x="30" y="50">80</text>
          </g>
          
          {/* X-axis labels */}
          <g className="text-xs fill-text-muted">
            <text textAnchor="middle" x="80" y="270">Jul</text>
            <text textAnchor="middle" x="150" y="270">Ago</text>
            <text textAnchor="middle" x="220" y="270">Set</text>
            <text textAnchor="middle" x="290" y="270">Out</text>
            <text textAnchor="middle" x="360" y="270">Nov</text>
            <text textAnchor="middle" x="430" y="270">Dez</text>
          </g>
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary-gold))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary-gold))" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path 
            d="M80,180 L150,150 L220,170 L290,120 L360,140 L430,100 L430,250 L80,250 Z" 
            fill="url(#chartGradient)"
          />
          
          {/* Line */}
          <polyline 
            fill="none" 
            points="80,180 150,150 220,170 290,120 360,140 430,100" 
            stroke="hsl(var(--primary-gold))" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
}