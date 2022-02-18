import { Body, Controller, Delete, Get, Param, Patch, Post, Query, NotFoundException} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery} from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { CreateMemberResDto } from './dtos/create-member-res.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { UpdateMemberResDto } from './dtos/update-member-res.dto';

//need to add an update members DTO

@ApiTags('members')
@Controller('members')
export class MembersController {

  constructor(public membersService: MembersService) {}


  //CREATE
  @ApiOperation({ summary: 'Sign up a new member using their email address' })
  @ApiResponse({ status: 201, description: 'Member successfully created'})
  @ApiResponse({ status: 400, description: 'Email must be a valid email'})
  @Post('/signup')
  createMembers(@Body() body: CreateMemberDto) {
    return this.membersService.create(body.email, body.password);
  }


  //READ1
  @ApiOperation({ summary: 'Find a member by using their DB generated ID' })
  @ApiParam({
    name: "id",
    description: "Enter a valid ID, for example: <b>1</b> ",
    allowEmptyValue: false,
    examples: {
        a: {
            summary: "1",
            description: "A valid ID",
            value: "1"
        },
        b: {
            summary: "2",
            description: "A valid ID",
            value: "2"
        }
    }
  })
  @ApiResponse({ status: 200, description: 'Found member data'})
  @ApiResponse({ status: 404, description: 'Member not found'})
  @Get('/:id')
  async findMemberById(@Param('id') id: string) {
    const member = await this.membersService.findOne(parseInt(id));
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }


  //READ2
  @ApiOperation({ summary: 'Find an existing member by using their email address' })
  @ApiQuery({
    name: 'email',
    description: "Enter a valid email address, for example: <b>test@gmail.com</b> ",
    required: true,
    examples: {
      a: {
          summary: "test@gmail.com",
          description: "A valid email address",
          value: "test@gmail.com"
      },
      b: {
        summary: "test@outlook.com",
        description: "Input a valid email address",
        value: "test@outlook.com"
    }
  }
  })
  @ApiResponse({ status: 200, description: 'Found member data', type: CreateMemberResDto})
  @ApiResponse({ status: 404, description: 'Member not found'})
  @Get()
  async findMemberByEmail(@Query('email') email: string) {
    const member = await this.membersService.find(email);
    if (member === undefined || member.length == 0) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }
 

  //UPDATE
  @ApiOperation({ summary: 'Update the password of an existing member' })
  @ApiResponse({ status: 200, description: 'Found member data', type: UpdateMemberResDto})
  @ApiResponse({ status: 404, description: 'Member not found'})
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateMemberDto) {
    return this.membersService.update(parseInt(id), body);
  }
  

  //DELETE
  @ApiOperation({ summary: 'Delete an existing member by using their DB generated ID' })
  @ApiParam({
    name: "id",
    description: "Enter a valid ID, for example: <b>1</b> ",
    allowEmptyValue: false,
    examples: {
        a: {
            summary: "1",
            description: "A valid ID",
            value: "1"
        },
        b: {
            summary: "2",
            description: "A valid ID",
            value: "2"
        }
    }
  })
  @ApiResponse({ status: 200, description: 'Found member data', type: UpdateMemberResDto})
  @ApiResponse({ status: 404, description: 'Member not found'})
  @Delete('/:id') 
  removeUser(@Param('id') id: string) {
    return this.membersService.remove(parseInt(id))
  }
  
}
