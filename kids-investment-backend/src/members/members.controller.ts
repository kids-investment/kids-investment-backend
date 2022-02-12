import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dtos/create-member.dto';
import { MembersService } from './members.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(public membersService: MembersService) {}

  @Get()
  listMembers() {
    return this.membersService.findAll();
  }

  @Post()
  createMembers(@Body() body: CreateMemberDto) {
    return this.membersService.create(body.name);
  }

  @Get('/:id')
  async getMembers(@Param('id') id: string) {
    const member = await this.membersService.findOne(id);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }
}
