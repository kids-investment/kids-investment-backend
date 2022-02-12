import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { Member } from './member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MembersController],
  //providers: [MembersService, MembersRepository],
  //providers = things that can be used as dependencies for other classes
  providers: [MembersService]
  //TypeORM will automatically generate MembersRepository
})
export class MembersModule {}
