'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnviarCobrancaFormData, enviarCobrancaSchema } from '@/entities/cobranca/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';

// Dados de exemplo (em uma aplicação real, viriam de uma API)
const mockCondominios = [
  { id: '1', nome: 'Residencial das Flores' },
  { id: '2', nome: 'Condomínio Vista Verde' },
];

const mockMoradores = {
  '1': [{ id: '101', nome: 'Sofia Almeida (Apto 101)' }, { id: '102', nome: 'Carlos Pereira (Apto 102)' }],
  '2': [{ id: '201', nome: 'Ana Costa (Casa 201)' }, { id: '202', nome: 'Ricardo Santos (Casa 202)' }],
};

const mockModelos = [
  { id: 'm1', nome: 'Cobrança de Aluguel' },
  { id: 'm2', nome: 'Cobrança de Aluguel Atrasado' },
  { id: 'm3', nome: 'Notificação de Despejo' },
];

/**
 * Documentação: EnviarCobrancaForm
 * Formulário para selecionar o destinatário e o modelo da cobrança a ser enviada.
 */
export const EnviarCobrancaForm = () => {
  const form = useForm<EnviarCobrancaFormData>({
    resolver: zodResolver(enviarCobrancaSchema),
  });

  const selectedCondominioId = form.watch('condominioId');

  function onSubmit(data: EnviarCobrancaFormData) {
    console.log('Dados para envio:', data);
    alert('Comando de envio de cobrança registrado! (Verifique o console)');
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="rounded-2xl shadow-sm border">
        <CardHeader>
          <CardTitle>Enviar Cobrança</CardTitle>
          <CardDescription>
            Selecione o destinatário e o modelo de carta para gerar e enviar a cobrança.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="condominioId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Selecione o Condomínio</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um condomínio..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockCondominios.map(condo => (
                          <SelectItem key={condo.id} value={condo.id}>{condo.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedCondominioId && (
                <FormField
                  control={form.control}
                  name="moradorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2. Selecione o Morador</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha um morador..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockMoradores[selectedCondominioId as keyof typeof mockMoradores]?.map(morador => (
                            <SelectItem key={morador.id} value={morador.id}>{morador.nome}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="modeloId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>3. Selecione o Modelo de Carta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um modelo..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockModelos.map(modelo => (
                          <SelectItem key={modelo.id} value={modelo.id}>{modelo.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="bg-gold hover:bg-gold-hover">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Cobrança
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};