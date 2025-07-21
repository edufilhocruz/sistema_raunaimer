'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnviarCobrancaFormData, enviarCobrancaSchema } from '@/entities/cobranca/types';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from 'lucide-react';
import { useCondominios } from '@/features/condominio/hooks/useCondominios';
import { useModelosDeCarta } from '@/features/modelos/hooks/useModelos';
import { useMoradoresPorCondominio } from '@/features/moradores/hooks/useMoradoresPorCondominio';

export const EnviarCobrancaForm = () => {
  const form = useForm<EnviarCobrancaFormData>({ resolver: zodResolver(enviarCobrancaSchema) });
  
  const [selectedCondominio, setSelectedCondominio] = useState<string | null>(null);
  
  const { condominioOptions, loading: loadingCondos } = useCondominios();
  const { modelos, loading: loadingModelos } = useModelosDeCarta();
  const { moradores, loading: loadingMoradores } = useMoradoresPorCondominio(selectedCondominio);

  function onSubmit(data: EnviarCobrancaFormData) {
    console.log('Dados para envio:', data);
    alert('Comando de envio de cobrança registrado!');
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="rounded-2xl shadow-sm border">
        <CardHeader><CardTitle>Enviar Cobrança Individual</CardTitle><CardDescription>Selecione os dados para gerar e enviar uma nova cobrança.</CardDescription></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField control={form.control} name="condominioId" render={({ field }) => (
                <FormItem>
                  <FormLabel>1. Selecione o Condomínio</FormLabel>
                  <Select onValueChange={(value) => { field.onChange(value); setSelectedCondominio(value); form.resetField("moradorId"); }} disabled={loadingCondos}>
                    <FormControl><SelectTrigger><SelectValue placeholder={loadingCondos ? "Carregando..." : "Escolha um condomínio..."} /></SelectTrigger></FormControl>
                    <SelectContent>{condominioOptions.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="moradorId" render={({ field }) => (
                <FormItem>
                  <FormLabel>2. Selecione o Morador</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedCondominio || loadingMoradores}>
                    <FormControl><SelectTrigger><SelectValue placeholder={loadingMoradores ? "Carregando..." : "Escolha um morador..."} /></SelectTrigger></FormControl>
                    <SelectContent>{moradores.map(m => <SelectItem key={m.id} value={m.id}>{m.nome} ({m.bloco}-{m.apartamento})</SelectItem>)}</SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="modeloId" render={({ field }) => (
                <FormItem>
                  <FormLabel>3. Selecione o Modelo de Carta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loadingModelos}>
                    <FormControl><SelectTrigger><SelectValue placeholder={loadingModelos ? "Carregando..." : "Escolha um modelo..."} /></SelectTrigger></FormControl>
                    <SelectContent>{modelos.map(m => <SelectItem key={m.id} value={m.id}>{m.titulo}</SelectItem>)}</SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )} />

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="bg-gold hover:bg-gold-hover"><Send className="mr-2 h-5 w-5" /> Enviar Cobrança</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
