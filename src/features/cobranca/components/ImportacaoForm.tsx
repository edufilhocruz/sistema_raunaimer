'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import cobrancaService from '../services/cobrancaService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCondominios } from '@/features/condominio/hooks/useCondominios';
import { useModelosDeCarta } from '@/features/modelos/hooks/useModelos';

export const ImportacaoForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [condominioId, setCondominioId] = useState<string | null>(null);
  const [modeloCartaId, setModeloCartaId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { condominioOptions, loading: loadingCondominios } = useCondominios();
  const { modelos } = useModelosDeCarta();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleImport = async () => {
    if (!file || !condominioId || !modeloCartaId) {
      toast({ variant: "destructive", title: "Erro de Validação", description: "Por favor, selecione o condomínio, o modelo de carta e o arquivo." });
      return;
    }

    setIsProcessing(true);
    try {
      const summary = await cobrancaService.importarPlanilha({ file, condominioId, modeloCartaId });
      toast({
        title: "Arquivo Enviado!",
        description: summary.message, // Exibe a mensagem de sucesso da API
      });
    } catch (error) {
      console.error("Falha na importação:", error);
      toast({ variant: "destructive", title: "Erro na Importação", description: "Não foi possível processar a requisição." });
    } finally {
      setIsProcessing(false);
      setFile(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-card p-8 rounded-2xl shadow-sm border space-y-6">
        <div className="text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-semibold text-foreground">Importar Cobranças da Planilha</h3>
          <p className="mt-1 text-sm text-muted-foreground">Selecione as opções e o arquivo Excel (.xlsx) para importar.</p>
        </div>

        <div className="space-y-4">
          <Select onValueChange={setCondominioId} disabled={loadingCondominios}>
            <SelectTrigger><SelectValue placeholder={loadingCondominios ? "Carregando..." : "1. Selecione o Condomínio"} /></SelectTrigger>
            <SelectContent>
              {condominioOptions.map(condo => <SelectItem key={condo.value} value={condo.value}>{condo.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select onValueChange={setModeloCartaId}>
            <SelectTrigger><SelectValue placeholder="2. Selecione o Modelo de Carta" /></SelectTrigger>
            <SelectContent>
              {modelos.map(modelo => <SelectItem key={modelo.id} value={modelo.id}>{modelo.titulo}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button asChild variant="outline" className="w-full">
            <label htmlFor="file-upload" className="cursor-pointer">
              {file ? file.name : '3. Selecionar Arquivo'}
              <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".xlsx, .xls" disabled={isProcessing} />
            </label>
          </Button>
          <Button size="lg" className="bg-gold hover:bg-gold-hover w-full" disabled={isProcessing || !file || !condominioId || !modeloCartaId} onClick={handleImport}>
            {isProcessing ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando...</> : <><CheckCircle2 className="mr-2 h-5 w-5" /> Confirmar e Importar</>}
          </Button>
        </div>
      </div>
    </div>
  );
};
