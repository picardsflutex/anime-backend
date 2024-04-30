import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import helmet from '@fastify/helmet'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  // Consts for app
  const PORT = process.env.PORT || '3003'
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(helmet)
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  // const sequelize = app.get(Sequelize); //delete for prod
  // await sequelize.sync({ force: true }); //delete for prod

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Anime Backend')
    .setDescription('Anime Backend system, with using NestJS and REST Api.')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  // Start server
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => console.log(`Started on port = ${process.env.PORT}`));
}

bootstrap();