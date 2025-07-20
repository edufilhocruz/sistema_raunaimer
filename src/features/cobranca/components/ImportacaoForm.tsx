'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { CobrancaImportada } from '@/entities/cobranca/types'; // Importação corrigida e padronizada
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileCheck2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const emailsExistentes = new Set(['sofia@email.com']);

type ExcelRow = {
  nome: string;
  email: string;
  bloco: string;
  apto: string;
  valor: number;
};

export const ImportacaoForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<CobrancaImportada[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const json = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, {
          header: ["nome", "email", "bloco", "apto", "valor"]
        });

        const dataRows = json.slice(1);

        const validatedData = dataRows.map((row, index): CobrancaImportada => {
          let status: CobrancaImportada['status'] = 'Válido';
          let mensagem = '';

          if (!row.nome || !row.email || !row.bloco || !row.apto || !row.valor) {
            status = 'Inválido';
            mensagem = 'Todos os campos são obrigatórios.';
          } else if (!/\S+@\S+\.\S+/.test(row.email)) {
            status = 'Inválido';
            mensagem = 'Formato de e-mail inválido.';
          } else if (emailsExistentes.has(row.email)) {
            status = 'Aviso';
            mensagem = 'Morador já existe. A cobrança será adicionada a ele.';
          }
          
          return {
            id: index,
            nome: row.nome || '',
            email: row.email || '',
            bloco: String(row.bloco || ''),
            apto: String(row.apto || ''),
            valor: Number(row.valor) || 0,
            status,
            mensagem,
          };
        });
        
        setPreviewData(validatedData);

      } catch (error) {
        console.error("Erro ao processar o arquivo:", error);
        toast({ variant: "destructive", title: "Erro", description: "Não foi possível ler o arquivo. Verifique o formato." });
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const hasErrors = previewData.some(item => item.status === 'Inválido');

  const handleImport = () => {
    const validRows = previewData.filter(row => row.status !== 'Inválido');
    console.log("Importando os seguintes dados:", validRows);
    toast({
      title: "Importação Concluída!",
      description: `${validRows.length} cobranças foram importadas com sucesso.`,
    });
    setFile(null);
    setPreviewData([]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-card p-8 rounded-2xl shadow-sm border text-center">
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-semibold text-foreground">
          Importar Cobranças em Massa
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Selecione um arquivo Excel (.xlsx) com as colunas: Nome, Email, Bloco, Apto, Valor.
        </p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <label htmlFor="file-upload">
              {file ? file.name : 'Selecionar Arquivo'}
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".xlsx, .xls" disabled={isProcessing} />
            </label>
          </Button>
        </div>
        {isProcessing && <p className="text-sm text-muted-foreground mt-2 animate-pulse">Processando arquivo...</p>}
      </div>

      {previewData.length > 0 && (
        <div className="bg-card rounded-2xl shadow-sm border">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Pré-visualização da Importação</h3>
            <p className="text-sm text-muted-foreground">
              {`Encontradas ${previewData.length} cobranças. Verifique os dados antes de confirmar.`}
            </p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead><TableHead>Unidade</TableHead><TableHead>Email</TableHead><TableHead>Valor</TableHead><TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{`${item.bloco} - ${item.apto}`}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{`R$ ${item.valor.toFixed(2)}`}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Válido' ? 'default' : item.status === 'Aviso' ? 'secondary' : 'destructive'}>
                        {item.status}
                      </Badge>
                      {item.mensagem && <p className="text-xs text-muted-foreground mt-1">{item.mensagem}</p>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-6 flex justify-end items-center gap-4">
            {hasErrors && <p className="text-sm text-destructive flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Corrija os erros no arquivo antes de importar.</p>}
            <Button size="lg" className="bg-gold hover:bg-gold-hover" disabled={hasErrors} onClick={handleImport}>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Confirmar e Importar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};