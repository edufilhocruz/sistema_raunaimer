import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Morador, StatusCobranca, StatusPagamento } from '../types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Props { moradores: Morador[] }

// Função para renderizar o status da cobrança com ícone
const getCobrancaStatusComponent = (status: StatusCobranca) => {
    const statusMap = {
        'Enviado': { icon: <CheckCircle2 className="h-4 w-4 text-green-500" />, label: 'Enviado' },
        'Erro': { icon: <XCircle className="h-4 w-4 text-destructive" />, label: 'Erro' },
        'Pendente': { icon: <AlertCircle className="h-4 w-4 text-amber-500" />, label: 'Pendente' },
    };
    const { icon, label } = statusMap[status];
    return <div className="flex items-center gap-2"><span className="sr-only">{label}</span>{icon}{label}</div>;
}

// Função para definir a cor do badge de status de pagamento
const getPagamentoStatusVariant = (status: StatusPagamento): "default" | "destructive" | "secondary" => {
    const statusMap: Record<StatusPagamento, "default" | "destructive" | "secondary"> = {
        'Em dia': 'default',
        'Atrasado': 'destructive',
        'Pendente': 'secondary',
    };
    return statusMap[status];
}

export const MoradoresTable = ({ moradores }: Props) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Nome</TableHead>
        <TableHead>Unidade</TableHead>
        <TableHead>Status Pagamento</TableHead>
        <TableHead>Última Cobrança</TableHead>
        <TableHead>Data do Envio</TableHead>
        <TableHead className="w-[50px]">Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {moradores.map((morador) => (
        <TableRow key={morador.id}>
          <TableCell className="font-medium">{morador.nome}</TableCell>
          <TableCell>{`${morador.condominioNome} / ${morador.bloco} - ${morador.apartamento}`}</TableCell>
          <TableCell>
            <Badge variant={getPagamentoStatusVariant(morador.statusPagamento)}>
              {morador.statusPagamento}
            </Badge>
          </TableCell>
          <TableCell>{getCobrancaStatusComponent(morador.ultimaCobrancaStatus)}</TableCell>
          <TableCell>{morador.ultimaCobrancaData ? new Date(morador.ultimaCobrancaData).toLocaleDateString('pt-BR') : 'N/A'}</TableCell>
          <TableCell>
             <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);