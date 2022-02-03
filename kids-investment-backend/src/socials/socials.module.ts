import { CacheModule, Module } from '@nestjs/common';
import { SocialsController } from './socials.controller';
import { TelegramModule } from 'src/telegram/telegram.module';
import { InstagramModule } from 'src/instagram/instagram.module';
import { YoutubeModule } from 'src/youtube/youtube.module';

@Module({
  imports: [
    CacheModule.register({ ttl: 60 * 60 }),
    TelegramModule,
    InstagramModule,
    YoutubeModule,
  ],
  controllers: [SocialsController],
})
export class SocialsModule {}
