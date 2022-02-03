import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { InstagramController } from './instagram.controller';

@Module({
  imports: [HttpModule],
  providers: [InstagramService],
  exports: [InstagramService],
  controllers: [InstagramController],
})
export class InstagramModule {}
