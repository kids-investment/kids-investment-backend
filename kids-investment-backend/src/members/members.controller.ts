import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMemberDto } from './dtos/create-member.dto'

@Controller('members')
export class MembersController {
    
  @Get()
  listMembers() {

  }

  @Post()
  createMembers(@Body() body: CreateMemberDto) {
    console.log(body);
  }

  @Get('/:id')
  getMembers(@Param('id') id: string) {
    console.log(id);
  }

  
}
