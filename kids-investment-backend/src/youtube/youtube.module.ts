import { CacheModule, Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CacheModule.register({ ttl: 60 * 60 }), ConfigModule],
  controllers: [YoutubeController],
  providers: [YoutubeService],
})
export class YoutubeModule {}
