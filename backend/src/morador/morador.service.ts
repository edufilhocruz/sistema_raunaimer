import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateMoradorDto } from './dto/create-morador.dto';
import { UpdateMoradorDto } from './dto/update-morador.dto';
import { MoradorRepository } from './morador.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoradorService {
  constructor(
    private readonly repository: MoradorRepository,
    private readonly prisma: PrismaService, // Injetamos o Prisma para checagens
  ) {}

  async create(createMoradorDto: CreateMoradorDto) {
    // Regra de negócio: Verificar se o condomínio existe
    const condominioExists = await this.prisma.condominio.findUnique({
      where: { id: createMoradorDto.condominioId },
    });
    if (!condominioExists) {
      throw new NotFoundException(`Condomínio com ID ${createMoradorDto.condominioId} não encontrado.`);
    }

    // Regra de negócio: Verificar se o e-mail já está em uso
    const emailExists = await this.prisma.morador.findUnique({
        where: { email: createMoradorDto.email },
    });
    if (emailExists) {
        throw new ConflictException(`O e-mail ${createMoradorDto.email} já está em uso.`);
    }

    return this.repository.create(createMoradorDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const morador = await this.repository.findOne(id);
    if (!morador) {
      throw new NotFoundException(`Morador com ID ${id} não encontrado.`);
    }
    return morador;
  }

  async update(id: string, updateMoradorDto: UpdateMoradorDto) {
    await this.findOne(id); // Garante que o morador existe
    return this.repository.update(id, updateMoradorDto);
  }

  async remove(id: string) {
    await this.findOne(id); // Garante que o morador existe
    return this.repository.remove(id);
  }
}
