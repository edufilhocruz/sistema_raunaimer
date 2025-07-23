import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

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
    const { permissoes, password, senha, ...rest } = data;
    let senhaHash = senha || password;
    if (senhaHash) {
      senhaHash = await bcrypt.hash(senhaHash, 10);
    }
    const usuario = await this.prisma.usuario.create({
      data: {
        ...rest,
        senha: senhaHash,
        permissoes: {
          create: (permissoes || []).map((permissaoId: string) => ({ permissaoId }))
        }
      },
      include: { permissoes: { include: { permissao: true } } }
    });
    return usuario;
  }

  async update(id: string, data: any) {
    const { permissoes, password, senha, ...rest } = data;
    let senhaHash = senha || password;
    if (senhaHash) {
      senhaHash = await bcrypt.hash(senhaHash, 10);
    }
    // Remove todas as permissões e adiciona as novas
    await this.prisma.permissaoUsuario.deleteMany({ where: { usuarioId: id } });
    return this.prisma.usuario.update({
      where: { id },
      data: {
        ...rest,
        ...(senhaHash ? { senha: senhaHash } : {}),
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