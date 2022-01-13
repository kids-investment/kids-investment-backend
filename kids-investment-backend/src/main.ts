import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MembersModule } from './members/members.module';

async function bootstrap() {
  const app = await NestFactory.create(MembersModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );
  await app.listen(3000);
}
bootstrap();
