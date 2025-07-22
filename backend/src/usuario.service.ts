import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.usuario.findMany({ include: { permissoes: { include: { permissao: true } } } });
  }

  findOne(id: string) {
    return this.prisma.usuario.findUnique({ where: { id }, include: { permissoes: { include: { permissao: true } } } });
  }

  async create(data: any) {
    // data.permissoes: array de permissaoId
    const { permissoes, ...rest } = data;
    const usuario = await this.prisma.usuario.create({
      data: {
        ...rest,
        permissoes: {
          create: (permissoes || []).map((permissaoId: string) => ({ permissaoId }))
        }
      },
      include: { permissoes: { include: { permissao: true } } }
    });
    return usuario;
  }

  async update(id: string, data: any) {
    const { permissoes, ...rest } = data;
    // Remove todas as permissões e adiciona as novas
    await this.prisma.permissaoUsuario.deleteMany({ where: { usuarioId: id } });
    return this.prisma.usuario.update({
      where: { id },
      data: {
        ...rest,
        permissoes: {
          create: (permissoes || []).map((permissaoId: string) => ({ permissaoId }))
        }
      },
      include: { permissoes: { include: { permissao: true } } }
    });
  }

  delete(id: string) {
    return this.prisma.usuario.delete({ where: { id } });
  }
} 