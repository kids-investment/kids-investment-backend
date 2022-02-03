import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MembersRepository } from './members.repository';

@Module({
  imports: [],
  controllers: [MembersController],
  providers: [MembersService, MembersRepository],
  //providers = things that can be used as dependencies for other classes
})
export class MembersModule {}
