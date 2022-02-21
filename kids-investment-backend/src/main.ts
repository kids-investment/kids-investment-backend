import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true  //used to filter out unrelated input fields that are not defined in the DTOs
  }));
  const config = new DocumentBuilder()
    .setTitle('Kids Investment Backend Server')
    .setDescription('Backend Server written using NestJS and Typescript to support simple CRUD APIs')
    .setVersion('1.0')
    .addTag('members')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
