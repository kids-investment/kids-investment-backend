import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dtos/create-member.dto';
import { MembersService } from './members.service';
import { ApiTags } from '@nestjs/swagger';
//need to add an update members DTO

@ApiTags('members')
@Controller('members')
export class MembersController {

  constructor(public membersService: MembersService) {}

  @Post('/signup')
  createMembers(@Body() body: CreateMemberDto) {
    return this.membersService.create(body.email, body.password);
  }

  // @Get('/:id')
  // async getMembers(@Param('id') id: string) {
  //   const member = await this.membersService.findOne(id);

  //   if (!member) {
  //     throw new NotFoundException('Member not found');
  //   }

  //   return member;
  // }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.membersService.findOne(parseInt(id));
  }

  // @Get()
  // listMembers() {
  //   return this.membersService.findAll();
  // }

  //DELETE

  //PATCH
  

  
}
