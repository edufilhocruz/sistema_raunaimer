import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailFormSchema, EmailFormData } from '../../types';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmailConfig } from '../../hooks/useEmailConfig';
import { Skeleton } from '@/components/ui/skeleton';

export const EmailTab = () => {
  const { config, loading } = useEmailConfig();
  
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    values: config, // 'values' carrega os dados no form quando o hook os obtém
  });

  const onSubmit = (data: EmailFormData) => {
    console.log("Salvando configurações de e-mail:", data);
    alert("Configurações salvas com sucesso!");
  };

  if (loading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de E-mail</CardTitle>
        <CardDescription>Defina como o sistema enviará as notificações e cobranças por e-mail.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="servidorSmtp" render={({ field }) => ( <FormItem><FormLabel>Servidor SMTP</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField control={form.control} name="porta" render={({ field }) => ( <FormItem><FormLabel>Porta</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl><FormMessage /></FormItem> )} />
              <FormField control={form.control} name="nomeRemetente" render={({ field }) => ( <FormItem><FormLabel>Nome do Remetente</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField control={form.control} name="emailRemetente" render={({ field }) => ( <FormItem><FormLabel>E-mail do Remetente</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem> )} />
            </div>
            <FormField control={form.control} name="senhaRemetente" render={({ field }) => ( <FormItem><FormLabel>Senha do Remetente</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="assinatura" render={({ field }) => ( <FormItem><FormLabel>Assinatura Padrão</FormLabel><FormControl><Textarea {...field} className="h-24" /></FormControl><FormMessage /></FormItem> )} />
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline">Testar Envio</Button>
              <Button type="submit" className="bg-gold hover:bg-gold-hover">Salvar Alterações</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};