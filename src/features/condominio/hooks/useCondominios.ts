import { useState, useEffect, useCallback } from 'react';
import { Condominio } from '../types';
import condominioService from '../services/condominioService';

export const useCondominios = () => {
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCondominios = useCallback(async () => {
    try {
      setLoading(true);
      const data = await condominioService.getCondominios();
      setCondominios(data);
    } catch (err) {
      setError('Falha ao carregar a lista de condomínios.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCondominios();
  }, [fetchCondominios]);

  return { condominios, loading, error, refresh: fetchCondominios };
};