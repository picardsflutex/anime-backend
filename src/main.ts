import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Consts for app
  const PORT = process.env.PORT || '3001'
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
  await app.listen(PORT, () => console.log(`Started on port = ${process.env.PORT}`));
}

bootstrap();