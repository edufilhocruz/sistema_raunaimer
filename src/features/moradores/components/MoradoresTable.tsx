import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Morador } from '../types';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Props {
  moradores: Morador[];
}

export const MoradoresTable = ({ moradores }: Props) => (
  <Table>
    <TableHeader><TableRow><TableHead>Nome</TableHead><TableHead>Condomínio</TableHead><TableHead>Unidade</TableHead><TableHead>Email</TableHead><TableHead className="w-[50px]">Ações</TableHead></TableRow></TableHeader>
    <TableBody>
      {moradores.map((morador) => (
        <TableRow key={morador.id}>
          <TableCell className="font-medium">{morador.nome}</TableCell>
          <TableCell>{morador.condominioNome}</TableCell>
          <TableCell>{morador.unidade}</TableCell>
          <TableCell>{morador.email}</TableCell>
          <TableCell>
             <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);