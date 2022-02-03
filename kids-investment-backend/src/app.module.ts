import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { YoutubeModule } from './youtube/youtube.module';
import { SocialsModule } from './socials/socials.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MembersModule,
    YoutubeModule,
    SocialsModule,
  ],
  controllers: [],
})
export class AppModule {}
