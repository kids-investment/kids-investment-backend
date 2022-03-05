import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from './members/members.module';
import { YoutubeModule } from './youtube/youtube.module';
import { SocialsModule } from './socials/socials.module';
import { ApplepodcastModule } from './applepodcast/applepodcast.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(),
    MembersModule,
    YoutubeModule,
    ApplepodcastModule,
    SocialsModule,
  ],
  controllers: [],
})
export class AppModule {}
