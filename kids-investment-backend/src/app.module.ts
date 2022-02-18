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
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   port: parseInt(<string>'5432'),
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'kids_investment',
    //   entities: [Member],
    //   synchronize: true, //In PRODCUTION this should be false
    //                      //to prevent overwriting the DB structure
  
    // }), 
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [Member],
    //   synchronize: true, //In PRODCUTION this should be false
    //                      //to prevent overwriting the DB structure
  
    // }), 
    MembersModule,
    YoutubeModule,
    SocialsModule,
  ],
  controllers: [],
})
export class AppModule {}
