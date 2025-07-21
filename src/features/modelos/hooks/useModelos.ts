import { useState, useEffect, useCallback } from 'react';
import { ModeloCarta, ModeloFormData } from '@/entities/modelos/types';
import modeloCartaService from '../services/modeloCartaService';
import { toast } from '@/components/ui/use-toast';

export const useModelos = () => {
  // CORREÇÃO: Garantimos que o estado inicial é sempre um array vazio.
  const [modelos, setModelos] = useState<ModeloCarta[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchModelos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await modeloCartaService.getModelos();
      // Verificamos se a API retornou um array antes de atualizar o estado.
      setModelos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Falha ao carregar modelos:", error);
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível carregar os modelos de carta.' });
      setModelos([]); // Em caso de erro, garantimos que 'modelos' continue a ser um array.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModelos();
  }, [fetchModelos]);

  const saveModelo = async (modelo: Partial<ModeloCarta>, data: ModeloFormData) => {
    // ... (lógica de salvar)
  };

  const deleteModelo = async (id: string) => {
    // ... (lógica de deletar)
  };

  return { modelos, loading, saveModelo, deleteModelo };
};