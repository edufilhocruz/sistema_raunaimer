import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { moradorSchema, MoradorFormData } from '../types';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';

interface Props {
  onSave: (data: MoradorFormData) => void;
}

export const MoradorForm = ({ onSave }: Props) => {
  const form = useForm<MoradorFormData>({
    resolver: zodResolver(moradorSchema),
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Adicionar Novo Morador</DialogTitle>
        <DialogDescription>Preencha os dados para cadastrar um novo morador no sistema.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 py-4">
          <FormField control={form.control} name="condominioId" render={({ field }) => (
            <FormItem>
              <FormLabel>Condomínio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecione o condomínio" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="1">Residencial das Flores</SelectItem>
                  <SelectItem value="2">Condomínio Vista Verde</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="nome" render={({ field }) => ( <FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Nome do morador" {...field} /></FormControl><FormMessage /></FormItem> )} />
          <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl><FormMessage /></FormItem> )} />
          <FormField control={form.control} name="unidade" render={({ field }) => ( <FormItem><FormLabel>Unidade (Apto / Casa)</FormLabel><FormControl><Input placeholder="Ex: Apto 101" {...field} /></FormControl><FormMessage /></FormItem> )} />

          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
            <Button type="submit" className="bg-gold hover:bg-gold-hover">Salvar Morador</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};