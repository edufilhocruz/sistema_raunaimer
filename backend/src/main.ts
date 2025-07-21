import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita a validação automática de DTOs em todas as rotas
  app.useGlobalPipes(new ValidationPipe());
  
  // Configuração explícita do CORS para maior compatibilidade
  app.enableCors({
    origin: 'http://localhost:8080', // Permite requisições do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Define um prefixo global para todas as rotas da API
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
