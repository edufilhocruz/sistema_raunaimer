'use client';

import { ModeloCarta, ModeloFormData } from "@/entities/modelos/types"; // Importar ModeloFormData
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PlusCircle } from "lucide-react";
import React, { useState } from 'react'; // Importar useState
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ModeloEditor } from './ModeloEditor';

// Dados de exemplo atualizados
const mockModelos: ModeloCarta[] = [
  { id: '1', titulo: 'Cobrança de Aluguel', descricao: 'Modelo padrão para a cobrança mensal do aluguel.', conteudo: 'Conteúdo do aluguel...' },
  { id: '2', titulo: 'Cobrança de Aluguel Atrasado', descricao: 'Notificação amigável para aluguéis com pagamento pendente.', conteudo: 'Conteúdo do aluguel atrasado...' },
  { id: '3', titulo: 'Notificação de Despejo', descricao: 'Notificação extrajudicial formal para início do processo de despejo.', conteudo: 'Conteúdo da notificação de despejo...' },
];

export const ModelosList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Partial<ModeloCarta> | null>(null);

  const handleEdit = (modelo: ModeloCarta) => {
    setSelectedModel(modelo);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedModel({});
    setIsModalOpen(true);
  };

  // Correção: Usar o tipo 'ModeloFormData' em vez de 'any'
  const handleSave = (data: ModeloFormData) => {
    console.log("Salvando modelo:", { ...selectedModel, ...data });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gerir Modelos de Carta</h2>
            <p className="text-muted-foreground">Crie e edite os modelos de carta para as suas cobranças.</p>
          </div>
          <Button className="bg-gold hover:bg-gold-hover" onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Novo Modelo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockModelos.map((modelo) => (
            <Card key={modelo.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-gold/10 p-3 rounded-lg"><FileText className="h-6 w-6 text-gold" /></div>
                  <CardTitle>{modelo.titulo}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow"><CardDescription>{modelo.descricao}</CardDescription></CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleEdit(modelo)}>
                  Editar Modelo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          {selectedModel && <ModeloEditor modelo={selectedModel} onSave={handleSave} />}
        </DialogContent>
      </Dialog>
    </>
  );
};