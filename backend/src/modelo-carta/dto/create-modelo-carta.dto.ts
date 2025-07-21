import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateModeloCartaDto {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @MinLength(5, { message: 'O título deve ter no mínimo 5 caracteres.' })
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'O conteúdo é obrigatório.' })
  @MinLength(10, { message: 'O conteúdo deve ter no mínimo 10 caracteres.' })
  conteudo: string;
}
