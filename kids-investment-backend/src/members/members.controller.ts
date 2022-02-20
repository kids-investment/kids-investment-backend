import { Body, Controller, Delete, Get, Param, Patch, Post, Query, NotFoundException, BadRequestException, UnauthorizedException} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery} from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { CreateMemberResDto } from './dtos/create-member-res.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { UpdateMemberResDto } from './dtos/update-member-res.dto';
import { sampleTime } from 'rxjs';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@ApiTags('members')
@Controller('members')
export class MembersController {

  constructor(public membersService: MembersService) {}


  //CREATE 1
  @ApiOperation({ summary: 'Sign up a new member using their email address' })
  @ApiResponse({ status: 201, description: 'Member successfully created'})
  @ApiResponse({ status: 400, description: 'Email must be a valid email'})
  @ApiResponse({ status: 400, description: 'Input email already exists in the DB'})
  @Post('/signup')
  async createMembers(@Body() body: CreateMemberDto) {

    //1) See if email is in use
    const member = await this.membersService.find(body.email);
    if (member.length) {
      throw new BadRequestException('Input email already exists in the DB');
    }

    //2) Hash the users password
    const salt = randomBytes(8).toString('hex');

    //3) Has the salt and password together
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    
    //4) Join the hashed result and the Salt together
    const result = salt + '.' + hash.toString('hex');
    
    //5) Create a new user, save it and return the user
    return this.membersService.create(body.email, result);

  }

  //CREATE 2
  @ApiOperation({ summary: 'Sign in a new member using their email address and saved password' })
  @ApiResponse({ status: 200, description: 'Found member data', type: CreateMemberResDto})
  @ApiResponse({ status: 400, description: 'Email must be a valid email'})
  @ApiResponse({ status: 401, description: 'Wrong password for this email!'})
  @ApiResponse({ status: 404, description: 'Member not found'})
  @Post('/signin')
  async verifyMembers(@Body() body: CreateMemberDto) {

    //1) See if email exists
    const [member] = await this.membersService.find(body.email);
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    //2) Retrieve stored hash and salt
    const [salt, storedHash] = member.password.split('.')

    //3) Generated has from given password
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    //4) Verify if hash from given password is the same as the has stored during signup
    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException("Wrong password for this email!")
    }

    return member;
  }


  //READ 1
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


  //READ 2
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
    const [member] = await this.membersService.find(email);
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }
 

  //UPDATE
  @ApiOperation({ summary: 'Update the password of an existing member by using their ID' })
  @ApiResponse({ status: 200, description: 'Found member data', type: UpdateMemberResDto})
  @ApiResponse({ status: 400, description: 'Email must be a valid email'})
  @ApiResponse({ status: 404, description: 'Member not found'})
  @Patch('/:id')
  async updateUserById(@Param('id') id: string, @Body() body: UpdateMemberDto) {
    const member = await this.membersService.findOne(parseInt(id));
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const updatedMember = new UpdateMemberDto()
    updatedMember.password = result

    return this.membersService.updateById(parseInt(id), updatedMember);
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
  async removeUser(@Param('id') id: string) {
    const member = await this.membersService.findOne(parseInt(id));
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return this.membersService.remove(parseInt(id))
  }
  
}
