import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from './members/members.module';
import { YoutubeModule } from './youtube/youtube.module';
import { SocialsModule } from './socials/socials.module';
import { Member } from './members/member.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Member],
      synchronize: true, //In PRODCUTION this should be false
                         //to prevent overwriting the DB structure
  
    }), 
    MembersModule,
    YoutubeModule,
    SocialsModule,
  ],
  controllers: [],
})
export class AppModule {}
