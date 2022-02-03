import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MembersModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Members example')
    .setDescription('The members API description')
    .setVersion('1.0')
    .addTag('members')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
