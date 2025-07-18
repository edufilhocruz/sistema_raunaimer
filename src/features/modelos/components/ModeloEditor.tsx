'use client';

import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModeloCarta, ModeloFormData, modeloSchema } from '@/entities/modelos/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Trash2, Copy, Save } from 'lucide-react';

interface ModeloEditorProps {
  modelo: Partial<ModeloCarta>; // Usamos Partial para o caso de um novo modelo
  onSave: (data: ModeloFormData) => void;
}

const variaveisDisponiveis = [
  '{{nome_condominio}}',
  '{{nome_morador}}',
  '{{valor}}',
  '{{mes}}',
  '{{bloco}}',
  '{{apto}}',
];

// Dados de exemplo para a pré-visualização
const previewData = {
  nome_condominio: "Condomínio Sol Nascente",
  nome_morador: "Ana Silva",
  valor: "R$ 550,00",
  mes: "Julho",
  bloco: "A",
  apto: "201",
};

export const ModeloEditor = ({ modelo, onSave }: ModeloEditorProps) => {
  const form = useForm<ModeloFormData>({
    resolver: zodResolver(modeloSchema),
    defaultValues: {
      titulo: modelo.titulo || '',
      conteudo: modelo.conteudo || '',
    },
  });

  const conteudoValue = form.watch('conteudo');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const renderPreview = () => {
    let previewText = conteudoValue || '';
    for (const key in previewData) {
      const typedKey = key as keyof typeof previewData;
      previewText = previewText.replace(new RegExp(`{{${typedKey}}}`, 'g'), previewData[typedKey]);
    }
    return previewText;
  };

  const handleVariableClick = (variavel: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText = text.substring(0, start) + ` ${variavel} ` + text.substring(end);
      form.setValue('conteudo', newText, { shouldValidate: true });
      textarea.focus();
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{modelo.id ? 'Editar Modelo de Cobrança' : 'Criar Novo Modelo de Cobrança'}</DialogTitle>
        <DialogDescription>
          Personalize o conteúdo da mensagem. Use as variáveis para inserir dados dinâmicos.
        </DialogDescription>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {/* Coluna da Esquerda: Formulário de Edição */}
          <div className="space-y-6">
            <FormField control={form.control} name="titulo" render={({ field }) => ( <FormItem> <FormLabel>Nome do Modelo</FormLabel> <FormControl> <Input placeholder="Ex: Cobrança Padrão Mensal" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="conteudo" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Conteúdo da Mensagem</FormLabel> <FormControl> <Textarea ref={textareaRef} placeholder="Digite sua mensagem aqui..." {...field} className="h-48 resize-none" /> </FormControl> <FormMessage /> </FormItem> )} />
            <div>
              <FormLabel>Variáveis Disponíveis</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {variaveisDisponiveis.map(v => (
                  <Badge key={v} variant="secondary" className="cursor-pointer" onClick={() => handleVariableClick(v)}>{v}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Pré-visualização */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="font-semibold mb-4 text-foreground">Pré-visualização Dinâmica</h3>
            <div className="space-y-2 text-sm text-muted-foreground whitespace-pre-wrap">
              <p><span className="font-semibold text-foreground">Assunto: Cobrança de Condomínio - {previewData.nome_condominio}</span></p>
              <p>Prezado(a) {previewData.nome_morador},</p>
              <p>{renderPreview()}</p>
              <p>Atenciosamente,<br/>Administração do {previewData.nome_condominio}.</p>
            </div>
          </div>
        </form>
      </Form>
      
      <DialogFooter className="justify-between">
        <div>
          <Button variant="destructive" type="button"><Trash2 className="mr-2 h-4 w-4" /> Excluir</Button>
          <Button variant="outline" type="button" className="ml-2"><Copy className="mr-2 h-4 w-4" /> Duplicar</Button>
        </div>
        <DialogClose asChild>
          <Button type="button" onClick={form.handleSubmit(onSave)} className="bg-gold hover:bg-gold-hover"><Save className="mr-2 h-4 w-4" /> Salvar Modelo</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};