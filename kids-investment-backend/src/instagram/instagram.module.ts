import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { InstagramController } from './instagram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IGFollowerCount, IGPost } from './instagram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IGFollowerCount, IGPost]), HttpModule],
  providers: [InstagramService],
  exports: [InstagramService],
  controllers: [InstagramController],
})
export class InstagramModule {}
