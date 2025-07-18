'use client';

import { ModeloCarta } from "@/entities/modelos/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PlusCircle } from "lucide-react";

// Dados de exemplo (mock). No futuro, viriam de uma API.
const mockModelos: ModeloCarta[] = [
  {
    id: '1',
    titulo: 'Cobrança de Aluguel',
    descricao: 'Modelo padrão para a cobrança mensal do aluguel.'
  },
  {
    id: '2',
    titulo: 'Cobrança de Aluguel Atrasado',
    descricao: 'Notificação amigável para aluguéis com pagamento pendente.'
  },
  {
    id: '3',
    titulo: 'Notificação de Despejo',
    descricao: 'Notificação extrajudicial formal para início do processo de despejo.'
  },
];

/**
 * Documentação: ModelosList
 * Exibe os modelos de carta disponíveis e permite a criação de novos.
 */
export const ModelosList = () => {
  return (
    <div className="space-y-8">
      {/* Cabeçalho da página com botão de ação */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gerir Modelos de Carta</h2>
          <p className="text-muted-foreground">
            Crie e edite os modelos de carta para as suas cobranças.
          </p>
        </div>
        <Button className="bg-gold hover:bg-gold-hover">
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar Novo Modelo
        </Button>
      </div>

      {/* Grid com os cards dos modelos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockModelos.map((modelo) => (
          <Card key={modelo.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-gold" />
                </div>
                <CardTitle>{modelo.titulo}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{modelo.descricao}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Editar Modelo
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};