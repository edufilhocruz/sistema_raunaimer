import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import { CobrancaRepository } from './cobranca.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CobrancaService {
  constructor(
    private readonly repository: CobrancaRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(createCobrancaDto: CreateCobrancaDto) {
    // Valida se as entidades relacionadas existem, usando os IDs dinâmicos do DTO
    const { moradorId, condominioId, modeloCartaId } = createCobrancaDto;

    const [morador, condominio, modeloCarta] = await Promise.all([
      this.prisma.morador.findUnique({ where: { id: moradorId } }),
      this.prisma.condominio.findUnique({ where: { id: condominioId } }),
      this.prisma.modeloCarta.findUnique({ where: { id: modeloCartaId } }),
    ]);

    if (!morador) throw new NotFoundException(`Morador com ID ${moradorId} não encontrado.`);
    if (!condominio) throw new NotFoundException(`Condomínio com ID ${condominioId} não encontrado.`);
    if (!modeloCarta) throw new NotFoundException(`Modelo de Carta com ID ${modeloCartaId} não encontrado.`);

    return this.repository.create(createCobrancaDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const cobranca = await this.repository.findOne(id);
    if (!cobranca) {
      throw new NotFoundException(`Cobrança com ID ${id} não encontrada.`);
    }
    return cobranca;
  }

  async update(id: string, updateCobrancaDto: UpdateCobrancaDto) {
    await this.findOne(id); // Garante que a cobrança existe
    return this.repository.update(id, updateCobrancaDto);
  }

  async remove(id: string) {
    await this.findOne(id); // Garante que a cobrança existe
    return this.repository.remove(id);
  }
}
