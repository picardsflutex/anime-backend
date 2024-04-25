import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Consts for app
  const PORT = process.env.PORT || '3003'
  const app = await NestFactory.create(AppModule);

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