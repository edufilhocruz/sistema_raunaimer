'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CondominioFormData, condominioSchema } from '@/entities/condominio/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IMaskInput } from 'react-imask';

/**
 * Documentação: CondominioForm (Versão com Card Maior)
 * - A largura máxima do card do formulário foi aumentada de `max-w-4xl` para `max-w-6xl`.
 */
export const CondominioForm = () => {
  const form = useForm<CondominioFormData>({
    resolver: zodResolver(condominioSchema),
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
  
  function onSubmit(data: CondominioFormData) {
    console.log('Dados do formulário válidos:', data);
    alert('Condomínio salvo com sucesso! (Verifique o console)');
  }

  return (
    // Alteração aqui: de max-w-4xl para max-w-6xl
    <div className="max-w-6xl mx-auto bg-card p-8 rounded-2xl shadow-sm border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem>
              <FormLabel>Nome do Condomínio</FormLabel>
              <FormControl>
                <Input {...form.register("nome")} placeholder="Residencial das Flores" />
              </FormControl>
              <FormMessage>{form.formState.errors.nome?.message}</FormMessage>
            </FormItem>
            
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Controller
                  name="cnpj"
                  control={form.control}
                  render={({ field }) => (
                    <IMaskInput
                      mask="00.000.000/0000-00"
                      value={field.value}
                      onAccept={field.onChange}
                      placeholder="00.000.000/0000-00"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  )}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.cnpj?.message}</FormMessage>
            </FormItem>
          </div>

          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <Controller
                name="cep"
                control={form.control}
                render={({ field }) => (
                  <IMaskInput
                    mask="00000-000"
                    value={field.value}
                    onAccept={(value) => {
                      field.onChange(value);
                      if (String(value).replace(/\D/g, '').length === 8) {
                        handleCepBlur(String(value));
                      }
                    }}
                    placeholder="00000-000"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                )}
              />
            </FormControl>
            <FormMessage>{form.formState.errors.cep?.message}</FormMessage>
          </FormItem>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormItem className="md:col-span-2"><FormLabel>Endereço</FormLabel><FormControl><Input {...form.register("logradouro")} /></FormControl><FormMessage>{form.formState.errors.logradouro?.message}</FormMessage></FormItem>
            <FormItem className="md:col-span-1"><FormLabel>Número</FormLabel><FormControl><Input {...form.register("numero")} /></FormControl><FormMessage>{form.formState.errors.numero?.message}</FormMessage></FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem><FormLabel>Complemento</FormLabel><FormControl><Input {...form.register("complemento")} placeholder="Apto, Bloco, etc. (Opcional)" /></FormControl><FormMessage>{form.formState.errors.complemento?.message}</FormMessage></FormItem>
            <FormItem><FormLabel>Bairro</FormLabel><FormControl><Input {...form.register("bairro")} /></FormControl><FormMessage>{form.formState.errors.bairro?.message}</FormMessage></FormItem>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormItem><FormLabel>Cidade</FormLabel><FormControl><Input {...form.register("cidade")} /></FormControl><FormMessage>{form.formState.errors.cidade?.message}</FormMessage></FormItem>
              <FormItem><FormLabel>Estado</FormLabel><FormControl><Input {...form.register("estado")} /></FormControl><FormMessage>{form.formState.errors.estado?.message}</FormMessage></FormItem>
           </div>
          
          <div className="flex justify-end gap-4 pt-6">
            <Button variant="outline" type="button" onClick={() => form.reset()}>Cancelar</Button>
            <Button type="submit" className="bg-gold hover:bg-gold-hover">Salvar Condomínio</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};