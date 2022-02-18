import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from './members/members.module';
import { YoutubeModule } from './youtube/youtube.module';
import { SocialsModule } from './socials/socials.module';
import { Member } from './members/member.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(),
    MembersModule,
    YoutubeModule,
    SocialsModule,
  ],
  controllers: [],
})
export class AppModule {}
