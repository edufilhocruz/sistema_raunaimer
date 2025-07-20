import { z } from 'zod';

export type StatusPagamento = 'Em dia' | 'Atrasado' | 'Pendente';

export interface Morador {
  id: string;
  nome: string;
  email: string;
  bloco: string;
  apartamento: string;
  telefone: string;
  statusPagamento: StatusPagamento;
  condominioNome: string;
}

export const moradorFormSchema = z.object({
  nome: z.string().min(3, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "Insira um e-mail válido." }),
  telefone: z.string().min(14, { message: "Telefone inválido." }), // Ex: (11) 98765-4321
  condominioId: z.string({ required_error: "Selecione um condomínio." }),
  bloco: z.string().min(1, { message: "O bloco é obrigatório." }),
  apartamento: z.string().min(1, { message: "O apartamento é obrigatório." }),
});

export type MoradorFormData = z.infer<typeof moradorFormSchema>;