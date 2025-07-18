import React, { useContext, useState, useMemo, ReactNode } from 'react';
import { ModeloCarta } from '@/entities/modelos/types';

// Tipos
interface ModelosDeCartaContextType {
  modelos: ModeloCarta[];
  adicionarModelo: (modelo: Omit<ModeloCarta, 'id'>) => void;
}

const ModelosDeCartaContext = React.createContext<ModelosDeCartaContextType | undefined>(undefined);

// Mock inicial
const modelosIniciais: ModeloCarta[] = [
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

export function ModelosDeCartaProvider({ children }: { children: ReactNode }) {
  const [modelos, setModelos] = useState<ModeloCarta[]>(modelosIniciais);

  function adicionarModelo(modelo: Omit<ModeloCarta, 'id'>) {
    setModelos(prev => [
      ...prev,
      { ...modelo, id: String(Date.now()) }
    ]);
  }

  const value = useMemo(() => ({ modelos, adicionarModelo }), [modelos]);

  return (
    <ModelosDeCartaContext.Provider value={value}>
      {children}
    </ModelosDeCartaContext.Provider>
  );
}

export function useModelosDeCarta() {
  const ctx = useContext(ModelosDeCartaContext);
  if (!ctx) throw new Error('useModelosDeCarta deve ser usado dentro de ModelosDeCartaProvider');
  return ctx;
} 