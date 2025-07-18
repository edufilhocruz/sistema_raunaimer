import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { segurancaFormSchema, SegurancaFormData } from '../../types';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSegurancaConfig } from '../../hooks/useSegurancaConfig';
import { Skeleton } from '@/components/ui/skeleton';

export const SegurancaTab = () => {
  const { config, loading } = useSegurancaConfig();
  const form = useForm<SegurancaFormData>({
    resolver: zodResolver(segurancaFormSchema),
    values: config,
  });

  const onSubmit = (data: SegurancaFormData) => {
    console.log("Salvando configurações de segurança:", data);
    alert("Configurações salvas!");
  };
  
  if (loading) return <Skeleton className="h-96 w-full" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Segurança</CardTitle>
        <CardDescription>Ajuste as políticas de segurança e acesso do sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField control={form.control} name="expiracaoSessao" render={({ field }) => ( <FormItem><FormLabel>Tempo de expiração de sessão (minutos)</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl><FormMessage /></FormItem> )} />
              <FormField control={form.control} name="tentativasLogin" render={({ field }) => ( <FormItem><FormLabel>Tentativas de login antes de bloqueio</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl><FormMessage /></FormItem> )} />
            </div>
            <Card>
                <CardHeader><CardTitle className="text-base">Requisitos de Senha</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="minCaracteresSenha" render={({ field }) => ( <FormItem><FormLabel>Mínimo de caracteres</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="requerNumero" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel>Obrigar uso de números</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )} />
                    <FormField control={form.control} name="requerEspecial" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel>Obrigar uso de caractere especial</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )} />
                </CardContent>
            </Card>
            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-gold hover:bg-gold-hover">Salvar Alterações</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};