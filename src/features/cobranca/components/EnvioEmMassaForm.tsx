'use client';

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
import { useModelos } from '@/features/modelos/hooks/useModelos';
import { useCondominios } from '@/features/condominio/hooks/useCondominios';
import { useMoradoresPorCondominio } from '@/features/moradores/hooks/useMoradoresPorCondominio';

export const EnvioEmMassaForm = () => {
  const form = useForm<EnvioEmMassaFormData>({
    resolver: zodResolver(envioEmMassaSchema),
    defaultValues: { moradoresIds: [] },
  });

  const selectedCondominioId = form.watch('condominioId');
  const { condominioOptions, loading: loadingCondos } = useCondominios();
  const { moradores, loading: loadingMoradores } = useMoradoresPorCondominio(selectedCondominioId || null);
  const { modelos } = useModelos();

  function onSubmit(data: EnvioEmMassaFormData) {
    console.log('Dados para envio em massa:', data);
    alert(`${data.moradoresIds.length} cobranças enviadas com sucesso!`);
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
                <FormField control={form.control} name="condominioId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Selecione o Condomínio</FormLabel>
                    <Select onValueChange={(value) => { field.onChange(value); form.setValue('moradoresIds', []); }} defaultValue={field.value} disabled={loadingCondos}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={loadingCondos ? 'Carregando...' : 'Escolha um condomínio...'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {condominioOptions.map(condo => (
                          <SelectItem key={condo.value} value={condo.value}>{condo.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="modeloId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>2. Selecione o Modelo de Carta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um modelo..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {modelos.map(modelo => (
                          <SelectItem key={modelo.id} value={modelo.id}>{modelo.titulo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {selectedCondominioId && moradores.length > 0 && (
                <FormField
                  control={form.control}
                  name="moradoresIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Selecione os Moradores</FormLabel>
                      <div className="mt-2 rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">
                                <Checkbox
                                  checked={field.value.length === moradores.length && moradores.length > 0}
                                  onCheckedChange={(checked) => {
                                    const allIds = moradores.map(m => m.id);
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
                            {moradores.map((morador) => (
                              <TableRow key={morador.id}>
                                <TableCell>
                                  <Checkbox
                                    checked={field.value.includes(morador.id)}
                                    onCheckedChange={(checked) => {
                                      const currentIds = field.value || [];
                                      const newIds = checked
                                        ? [...currentIds, morador.id]
                                        : currentIds.filter((id) => id !== morador.id);
                                      field.onChange(newIds);
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{morador.nome}</TableCell>
                                <TableCell>{morador.bloco}-{morador.apartamento}</TableCell>
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