import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';

@Injectable()
export class CobrancaRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createCobrancaDto: CreateCobrancaDto) {
    return this.prisma.cobranca.create({ data: createCobrancaDto });
  }

  findAll() {
    return this.prisma.cobranca.findMany({
      include: {
        morador: { select: { nome: true } },
        condominio: { select: { nome: true } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.cobranca.findUnique({
      where: { id },
      include: { morador: true, condominio: true, modeloCarta: true },
    });
  }

  update(id: string, updateCobrancaDto: UpdateCobrancaDto) {
    return this.prisma.cobranca.update({
      where: { id },
      data: updateCobrancaDto,
    });
  }

  remove(id: string) {
    return this.prisma.cobranca.delete({ where: { id } });
  }
}
