'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CondominioFormData, condominioFormSchema } from '@/features/condominio/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IMaskInput } from 'react-imask';

interface CondominioFormProps {
  onSave: (data: CondominioFormData) => void;
}

export const CondominioForm = ({ onSave }: CondominioFormProps) => {
  const form = useForm<CondominioFormData>({
    resolver: zodResolver(condominioFormSchema),
    defaultValues: {
      nome: '', cnpj: '', cep: '', logradouro: '', numero: '',
      complemento: '', bairro: '', cidade: '', estado: '', administradora: '',
    },
    mode: 'onBlur',
  });

  const handleCepBlur = async (cepValue: string) => {
    const cep = cepValue.replace(/\D/g, '');
    if (cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error('CEP não encontrado');
      
      const data = await response.json();
      if (data.erro) {
         form.setError('cep', { message: 'CEP não localizado.' });
      } else {
        form.setValue('logradouro', data.logradouro || '', { shouldValidate: true });
        form.setValue('bairro', data.bairro || '', { shouldValidate: true });
        form.setValue('cidade', data.localidade || '', { shouldValidate: true });
        form.setValue('estado', data.uf || '', { shouldValidate: true });
        form.setFocus('numero');
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      form.setError('cep', { message: 'Erro ao buscar CEP.' });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Adicionar Novo Condomínio</DialogTitle>
        <DialogDescription>Preencha os dados completos para o novo condomínio.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6 py-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller name="nome" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Nome do Condomínio</FormLabel><FormControl><Input {...field} placeholder="Residencial das Flores" /></FormControl><FormMessage /></FormItem> )} />
            <Controller name="cnpj" control={form.control} render={({ field }) => ( <FormItem><FormLabel>CNPJ</FormLabel><FormControl><IMaskInput mask="00.000.000/0000-00" {...field} onAccept={field.onChange} placeholder="00.000.000/0000-00" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" /></FormControl><FormMessage /></FormItem> )} />
          </div>

          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <Controller name="cep" control={form.control} render={({ field }) => (
                  <IMaskInput mask="00000-000" value={field.value} onAccept={(value) => { field.onChange(value); if (String(value).replace(/\D/g, '').length === 8) { handleCepBlur(String(value)); } }} placeholder="00000-000" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
              )} />
            </FormControl>
            <FormMessage />
          </FormItem>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Controller name="logradouro" control={form.control} render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Endereço</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
            <Controller name="numero" control={form.control} render={({ field }) => ( <FormItem className="md:col-span-1"><FormLabel>Número</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller name="complemento" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Complemento</FormLabel><FormControl><Input {...field} placeholder="Apto, Bloco, etc. (Opcional)" /></FormControl><FormMessage /></FormItem> )} />
            <Controller name="bairro" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Bairro</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller name="cidade" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Cidade</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
              <Controller name="estado" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Estado</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
           </div>
          
          <DialogFooter className="pt-6">
            <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
            <Button type="submit" className="bg-gold hover:bg-gold-hover">Salvar Condomínio</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};