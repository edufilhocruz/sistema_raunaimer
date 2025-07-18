import { z } from 'zod';

export interface Morador {
  id: string;
  nome: string;
  email: string;
  unidade: string; // Ex: "Apto 101", "Casa 2"
  condominioId: string;
  condominioNome: string;
}

export const moradorSchema = z.object({
  nome: z.string().min(3, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "Insira um e-mail válido." }),
  unidade: z.string().min(1, { message: "A unidade é obrigatória." }),
  condominioId: z.string({ required_error: "Selecione um condomínio." }),
});

export type MoradorFormData = z.infer<typeof moradorSchema>;