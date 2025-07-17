import { Badge } from "@/components/ui/badge";

const charges = [
  {
    date: "05/01/2024",
    condominium: "Residencial das Flores",
    resident: "Carlos Silva",
    value: "R$ 550,00",
    status: "Enviado",
    statusType: "sent"
  },
  {
    date: "03/01/2024",
    condominium: "Edifício Sol Nascente",
    resident: "Ana Souza",
    value: "R$ 620,00",
    status: "Pago",
    statusType: "paid"
  },
  {
    date: "02/01/2024",
    condominium: "Condomínio Vista Alegre",
    resident: "Roberto Almeida",
    value: "R$ 480,00",
    status: "Enviado",
    statusType: "sent"
  },
  {
    date: "30/12/2023",
    condominium: "Residencial das Flores",
    resident: "Mariana Costa",
    value: "R$ 550,00",
    status: "Pago",
    statusType: "paid"
  },
  {
    date: "28/12/2023",
    condominium: "Edifício Sol Nascente",
    resident: "Lucas Pereira",
    value: "R$ 620,00",
    status: "Atrasado",
    statusType: "overdue"
  }
];

function getStatusVariant(statusType: string) {
  switch (statusType) {
    case "paid":
      return "default";
    case "sent":
      return "secondary";
    case "overdue":
      return "destructive";
    default:
      return "secondary";
  }
}

function getStatusClassName(statusType: string) {
  switch (statusType) {
    case "paid":
      return "bg-success-light text-success border-success/20";
    case "sent":
      return "bg-info-light text-info border-info/20";
    case "overdue":
      return "bg-danger-light text-danger border-danger/20";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function RecentChargesTable() {
  return (
    <section className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
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
              <th scope="col" className="px-6 py-3">Valor</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {charges.map((charge, index) => (
              <tr 
                key={index}
                className={index % 2 === 0 ? "bg-background border-b border-border" : "bg-bg-secondary border-b border-border"}
              >
                <td className="px-6 py-4 font-medium text-foreground">{charge.date}</td>
                <td className="px-6 py-4">{charge.condominium}</td>
                <td className="px-6 py-4">{charge.resident}</td>
                <td className="px-6 py-4">{charge.value}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClassName(charge.statusType)}`}>
                    {charge.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}