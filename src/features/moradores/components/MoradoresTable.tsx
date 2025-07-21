import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Morador, StatusCobranca, StatusPagamento } from '../types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, CheckCircle2, XCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Props {
  moradores: Morador[];
}

// Objeto de configuração para o Status de Pagamento
const statusPagamentoConfig: Record<StatusPagamento, { variant: "default" | "destructive" | "secondary", label: string }> = {
    'EM_DIA': { variant: 'default', label: 'Em dia' },
    'ATRASADO': { variant: 'destructive', label: 'Atrasado' },
    'PENDENTE': { variant: 'secondary', label: 'Pendente' },
};

// Objeto de configuração para o Status da Cobrança
const cobrancaStatusConfig: Record<StatusCobranca, { icon: React.ReactNode, label: string }> = {
    'Enviado': { icon: <CheckCircle2 className="h-4 w-4 text-green-500" />, label: 'Enviado' },
    'Erro': { icon: <XCircle className="h-4 w-4 text-destructive" />, label: 'Erro' },
    'Pendente': { icon: <AlertCircle className="h-4 w-4 text-amber-500" />, label: 'Pendente' },
};

/**
 * Componente seguro para renderizar o Status da Cobrança.
 * Ele lida com casos onde o status pode ser nulo ou indefinido.
 */
const CobrancaStatusComponent = React.memo(({ status }: { status?: StatusCobranca | null }) => {
    // CORREÇÃO: Adicionamos uma verificação de segurança.
    if (!status || !cobrancaStatusConfig[status]) {
        return <div className="flex items-center gap-2 text-muted-foreground"><HelpCircle className="h-4 w-4" /> N/A</div>;
    }
    const config = cobrancaStatusConfig[status];
    return <div className="flex items-center gap-2"><span className="sr-only">{config.label}</span>{config.icon}{config.label}</div>;
});

export const MoradoresTable = React.memo(({ moradores }: Props) => {
  return (
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
        {moradores.map((morador) => {
          // CORREÇÃO: Verificação de segurança para o status de pagamento.
          const pagamentoConfig = morador.statusPagamento ? statusPagamentoConfig[morador.statusPagamento] : null;

          return (
            <TableRow key={morador.id}>
              <TableCell className="font-medium">{morador.nome}</TableCell>
              <TableCell>{`${morador.condominio.nome} / ${morador.bloco} - ${morador.apartamento}`}</TableCell>
              <TableCell>
                {pagamentoConfig ? (
                  <Badge variant={pagamentoConfig.variant}>
                    {pagamentoConfig.label}
                  </Badge>
                ) : (
                  <Badge variant="secondary">N/A</Badge>
                )}
              </TableCell>
              <TableCell>
                <CobrancaStatusComponent status={morador.ultimaCobrancaStatus} />
              </TableCell>
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
          );
        })}
      </TableBody>
    </Table>
  );
});