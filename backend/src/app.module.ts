import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CondominioModule } from './condominio/condominio.module';
import { MoradorModule } from './morador/morador.module';
import { CobrancaModule } from './cobranca/cobranca.module';
import { ModeloCartaModule } from './modelo-carta/modelo-carta.module';
import { EmailConfigService } from './email-config.service';
import { EmailConfigController } from './email-config.controller';
import { PrismaService } from './prisma/prisma.service';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PermissaoService } from './permissao.service';
import { PermissaoController } from './permissao.controller';
import { StatusEnvio } from '@prisma/client';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CondominioModule,
    MoradorModule,
    CobrancaModule,
    ModeloCartaModule,
  ],
  controllers: [AppController, EmailConfigController, UsuarioController, PermissaoController],
  providers: [AppService, EmailConfigService, PrismaService, UsuarioService, PermissaoService],
})
export class AppModule {}
