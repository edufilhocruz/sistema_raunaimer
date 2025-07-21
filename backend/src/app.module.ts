import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CondominioModule } from './condominio/condominio.module';
import { MoradorModule } from './morador/morador.module';
import { CobrancaModule } from './cobranca/cobranca.module';
import { ModeloCartaModule } from './modelo-carta/modelo-carta.module';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
