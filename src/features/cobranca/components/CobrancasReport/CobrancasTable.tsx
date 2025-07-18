import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { HistoricoCobranca, CobrancaStatus } from '../../types';

interface Props {
  data: HistoricoCobranca[];
}

const getStatusVariant = (status: CobrancaStatus): "default" | "destructive" | "secondary" => {
    const statusMap: Record<CobrancaStatus, "default" | "destructive" | "secondary"> = {
        'Pago': 'default',
        'Atrasado': 'destructive',
        'Em Aberto': 'secondary',
    };
    return statusMap[status];
}

export const CobrancasTable = ({ data }: Props) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Morador</TableHead>
          <TableHead>Condomínio</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Data/Hora do Envio</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((cobranca) => (
          <TableRow key={cobranca.id}>
            <TableCell className="font-medium">{cobranca.morador}</TableCell>
            <TableCell>{cobranca.condominio}</TableCell>
            <TableCell>{cobranca.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
            <TableCell>{new Date(cobranca.dataEnvio).toLocaleString('pt-BR')}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(cobranca.status)}>
                {cobranca.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);