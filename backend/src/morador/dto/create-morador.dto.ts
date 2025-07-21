import { IsString, IsNotEmpty, IsEmail, Length, IsUUID } from 'class-validator';

export class CreateMoradorDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O bloco é obrigatório.' })
  bloco: string;
  
  @IsString()
  @IsNotEmpty({ message: 'O apartamento é obrigatório.' })
  apartamento: string;
  
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @Length(14, 15, { message: 'O telefone deve estar no formato (XX) XXXXX-XXXX.' })
  telefone: string;
  
  @IsUUID('4', { message: 'O ID do condomínio deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O condomínio é obrigatório.' })
  condominioId: string;
}
