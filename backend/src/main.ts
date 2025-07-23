import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as fs from 'fs';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // Carrega os certificados SSL
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../certs/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../certs/cert.pem')),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  // Helmet para proteção de headers HTTP (configuração reforçada)
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'same-site' },
      crossOriginEmbedderPolicy: true,
      crossOriginOpenerPolicy: { policy: 'same-origin' },
      contentSecurityPolicy: false, // Desabilite se usar inline styles/scripts no Swagger
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      frameguard: { action: 'deny' },
      hsts: { maxAge: 31536000, includeSubDomains: true },
      xssFilter: true,
      hidePoweredBy: true,
      ieNoOpen: true,
    })
  );

  // Adicionado cookieParser para leitura de cookies nas requisições
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Documentação da API')
    .setDescription('Endpoints do sistema Raunaimer')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Habilita a validação automática de DTOs em todas as rotas
  app.useGlobalPipes(new ValidationPipe());
  
  // Configuração explícita do CORS para maior compatibilidade
  app.enableCors({
    origin: 'https://localhost:8080', // Permite requisições do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Define um prefixo global para todas as rotas da API
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
