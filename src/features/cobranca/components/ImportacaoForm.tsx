'use client';

import React, { useState } from 'react';
import { CobrancaImportData } from '@/entities/cobranca/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, FileCheck2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dados de exemplo para a pré-visualização
const mockPreviewData: CobrancaImportData[] = [
  { id: 1, morador: 'Carlos Pereira', unidade: 'A-101', valor: 620.00, vencimento: '20/07/2024', status: 'Válido' },
  { id: 2, morador: 'Ana Costa', unidade: 'B-203', valor: 480.00, vencimento: '20/07/2024', status: 'Válido' },
  { id: 3, morador: 'Ricardo Santos', unidade: 'C-305', valor: 590.00, vencimento: '20/07/2024', status: 'Válido' },
  { id: 4, morador: 'Mariana Oliveira', unidade: 'D-401', valor: 510.00, vencimento: '20/07/2024', status: 'Inválido', erro: 'Morador não encontrado' },
];

/**
 * Documentação: ImportacaoForm
 * Componente para o upload e pré-visualização de cobranças em massa.
 */
export const ImportacaoForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<CobrancaImportData[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      // Em uma aplicação real, você processaria o CSV aqui e depois chamaria setPreviewData.
      // Por agora, usamos os dados de exemplo.
      setPreviewData(mockPreviewData);
    }
  };

  const hasErrors = previewData.some(item => item.status === 'Inválido');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Card de Upload */}
      <div className="bg-card p-8 rounded-2xl shadow-sm border text-center">
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-semibold text-foreground">
          Importar Cobranças em Massa
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Arraste e solte um arquivo CSV aqui, ou clique para selecionar.
        </p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <label htmlFor="file-upload">
              {file ? file.name : 'Selecionar Arquivo'}
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv" />
            </label>
          </Button>
        </div>
      </div>

      {/* Tabela de Pré-visualização */}
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
                  <TableHead>Morador</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.morador}</TableCell>
                    <TableCell>{item.unidade}</TableCell>
                    <TableCell>{`R$ ${item.valor.toFixed(2)}`}</TableCell>
                    <TableCell>{item.vencimento}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Válido' ? 'default' : 'destructive'}>
                        {item.status === 'Válido' ? <FileCheck2 className="mr-1 h-3 w-3" /> : <AlertTriangle className="mr-1 h-3 w-3" />}
                        {item.status}
                      </Badge>
                      {item.erro && <p className="text-xs text-destructive mt-1">{item.erro}</p>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-6 flex justify-end items-center gap-4">
            {hasErrors && <p className="text-sm text-destructive flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Corrija os erros no arquivo antes de importar.</p>}
            <Button size="lg" className="bg-gold hover:bg-gold-hover" disabled={hasErrors}>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Confirmar Importação
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};