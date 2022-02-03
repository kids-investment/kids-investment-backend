import { CacheModule, Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { YoutubeModule } from './youtube/youtube.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MembersModule,
    YoutubeModule,
  ],
  controllers: [],
})
export class AppModule {}
