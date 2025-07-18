'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvioEmMassaFormData, envioEmMassaSchema, MoradorParaSelecao } from '@/entities/cobranca/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Send } from 'lucide-react';

// Dados de exemplo
const mockCondominios = [
  { id: '1', nome: 'Residencial das Flores' },
  { id: '2', nome: 'Condomínio Vista Verde' },
];
const mockMoradores: { [key: string]: MoradorParaSelecao[] } = {
  '1': [
    { id: '101', nome: 'Sofia Almeida', unidade: 'A-101', email: 'sofia@email.com' },
    { id: '102', nome: 'Carlos Pereira', unidade: 'A-102', email: 'carlos@email.com' },
    { id: '103', nome: 'Beatriz Costa', unidade: 'B-201', email: 'beatriz@email.com' },
  ],
  '2': [
    { id: '201', nome: 'Ana Costa', unidade: 'Casa 201', email: 'ana@email.com' },
    { id: '202', nome: 'Ricardo Santos', unidade: 'Casa 202', email: 'ricardo@email.com' },
  ],
};
const mockModelos = [
  { id: 'm1', nome: 'Cobrança de Aluguel' },
  { id: 'm2', nome: 'Cobrança de Aluguel Atrasado' },
];

/**
 * Documentação: EnvioEmMassaForm (Versão Final e Estável)
 * - Lógica de checkboxes totalmente refatorada para ser robusta e evitar erros de renderização.
 * - Utiliza <Controller> para gerir o estado da lista de moradores selecionados.
 */
export const EnvioEmMassaForm = () => {
  const form = useForm<EnvioEmMassaFormData>({
    resolver: zodResolver(envioEmMassaSchema),
    defaultValues: { moradoresIds: [] },
  });

  const selectedCondominioId = form.watch('condominioId');
  const moradoresDoCondominio = selectedCondominioId ? mockMoradores[selectedCondominioId] : [];

  function onSubmit(data: EnvioEmMassaFormData) {
    console.log('Dados para envio em massa:', data);
    alert(`${data.moradoresIds.length} cobranças enviadas com sucesso! (Verifique o console)`);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="rounded-2xl shadow-sm border">
            <CardHeader>
              <CardTitle>Envio de Cobrança em Massa</CardTitle>
              <CardDescription>
                Selecione o condomínio, o modelo e os moradores para enviar as cobranças.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="condominioId" render={({ field }) => ( <FormItem> <FormLabel>1. Selecione o Condomínio</FormLabel> <Select onValueChange={(value) => { field.onChange(value); form.setValue('moradoresIds', []); }} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Escolha um condomínio..." /> </SelectTrigger> </FormControl> <SelectContent> {mockCondominios.map(condo => ( <SelectItem key={condo.id} value={condo.id}>{condo.nome}</SelectItem> ))} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="modeloId" render={({ field }) => ( <FormItem> <FormLabel>2. Selecione o Modelo de Carta</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Escolha um modelo..." /> </SelectTrigger> </FormControl> <SelectContent> {mockModelos.map(modelo => ( <SelectItem key={modelo.id} value={modelo.id}>{modelo.nome}</SelectItem> ))} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
              </div>

              {selectedCondominioId && moradoresDoCondominio.length > 0 && (
                <Controller
                  name="moradoresIds"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Selecione os Moradores</FormLabel>
                      <div className="mt-2 rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">
                                <Checkbox
                                  checked={field.value.length === moradoresDoCondominio.length}
                                  onCheckedChange={(checked) => {
                                    const allIds = moradoresDoCondominio.map(m => m.id);
                                    field.onChange(checked ? allIds : []);
                                  }}
                                />
                              </TableHead>
                              <TableHead>Nome</TableHead>
                              <TableHead>Unidade</TableHead>
                              <TableHead>Email</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {moradoresDoCondominio.map((morador) => (
                              <TableRow key={morador.id}>
                                <TableCell>
                                  <Checkbox
                                    checked={field.value.includes(morador.id)}
                                    onCheckedChange={(checked) => {
                                      const newValue = checked
                                        ? [...field.value, morador.id]
                                        : field.value.filter((id) => id !== morador.id);
                                      field.onChange(newValue);
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{morador.nome}</TableCell>
                                <TableCell>{morador.unidade}</TableCell>
                                <TableCell>{morador.email}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="bg-gold hover:bg-gold-hover">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Cobranças Selecionadas
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};