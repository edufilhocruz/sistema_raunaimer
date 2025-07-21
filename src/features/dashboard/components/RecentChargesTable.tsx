import { ChargeStatus } from '@/entities/dashboard/types'; // Garantimos que o tipo é importado

// Objeto de configuração para os badges
const statusConfig: Record<ChargeStatus, { label: string, className: string }> = {
  paid: { label: 'Pago', className: 'bg-success-light text-success border-success/20' },
  sent: { label: 'Enviado', className: 'bg-info-light text-info border-info/20' },
  overdue: { label: 'Atrasado', className: 'bg-danger-light text-danger border-danger/20' },
};

// Dados agora usam o tipo ChargeStatus para segurança
const charges: { date: string; condominium: string; resident: string; value: string; status: ChargeStatus }[] = [
  { date: "05/01/2024", condominium: "Residencial das Flores", resident: "Carlos Silva", value: "R$ 550,00", status: "sent" },
  { date: "03/01/2024", condominium: "Edifício Sol Nascente", resident: "Ana Souza", value: "R$ 620,00", status: "paid" },
  { date: "02/01/2024", condominium: "Condomínio Vista Alegre", resident: "Roberto Almeida", value: "R$ 480,00", status: "sent" },
  { date: "30/12/2023", condominium: "Residencial das Flores", resident: "Mariana Costa", value: "R$ 550,00", status: "paid" },
  { date: "28/12/2023", condominium: "Edifício Sol Nascente", resident: "Lucas Pereira", value: "R$ 620,00", status: "overdue" },
];

export function RecentChargesTable() {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden h-full">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground">Últimos Envios de Cobrança</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-text-secondary">
          <thead className="text-xs text-foreground uppercase bg-bg-secondary">
            <tr>
              <th scope="col" className="px-6 py-3">Data</th>
              <th scope="col" className="px-6 py-3">Condomínio</th>
              <th scope="col" className="px-6 py-3">Morador</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {charges.map((charge, index) => (
              <tr 
                key={index}
                className="bg-background border-b border-border"
              >
                <td className="px-6 py-4 font-medium text-foreground">{charge.date}</td>
                <td className="px-6 py-4">{charge.condominium}</td>
                <td className="px-6 py-4">{charge.resident}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[charge.status].className}`}>
                    {statusConfig[charge.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}