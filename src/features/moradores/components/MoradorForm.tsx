import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { moradorFormSchema, MoradorFormData } from '../types';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { IMaskInput } from 'react-imask';

interface Props { onSave: (data: MoradorFormData) => void; }

export const MoradorForm = ({ onSave }: Props) => {
  const form = useForm<MoradorFormData>({ resolver: zodResolver(moradorFormSchema) });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Adicionar Novo Morador</DialogTitle>
        <DialogDescription>Preencha os dados para cadastrar um novo morador no sistema.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 py-4">
          <FormField control={form.control} name="condominioId" render={({ field }) => (
            <FormItem><FormLabel>Condomínio</FormLabel>
              <Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue placeholder="Selecione o condomínio" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="1">Residencial das Flores</SelectItem>
                  <SelectItem value="2">Condomínio Vista Verde</SelectItem>
                  <SelectItem value="3">Edifício Central</SelectItem>
                </SelectContent>
              </Select><FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="nome" render={({ field }) => ( <FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Nome do morador" {...field} /></FormControl><FormMessage /></FormItem> )} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="bloco" render={({ field }) => ( <FormItem><FormLabel>Bloco</FormLabel><FormControl><Input placeholder="Ex: A" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="apartamento" render={({ field }) => ( <FormItem><FormLabel>Apartamento</FormLabel><FormControl><Input placeholder="Ex: 101" {...field} /></FormControl><FormMessage /></FormItem> )} />
          </div>
          <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl><FormMessage /></FormItem> )} />
          <FormField control={form.control} name="telefone" render={({ field }) => ( <FormItem><FormLabel>Telefone</FormLabel><FormControl><IMaskInput mask="(00) 00000-0000" placeholder="(11) 98765-4321" {...field} onAccept={field.onChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></FormControl><FormMessage /></FormItem> )} />
          <DialogFooter className="pt-4">
            <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
            <Button type="submit" className="bg-gold hover:bg-gold-hover">Salvar Morador</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};