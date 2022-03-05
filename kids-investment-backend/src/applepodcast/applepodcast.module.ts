import { Module, CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApplepodcastController } from './applepodcast.controller';
import { ApplePodcastService } from './applepodcast.service';

@Module({
  imports: [
    CacheModule.register({ ttl: 24 * 60 * 60 }),
    HttpModule,
    ApplepodcastModule,
  ],
  providers: [ApplePodcastService],
  controllers: [ApplepodcastController],
})
export class ApplepodcastModule {}
