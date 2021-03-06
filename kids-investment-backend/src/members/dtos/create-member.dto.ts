import {IsEmail, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateMemberDto {
  @ApiProperty({
    type: String,
    description: "Valid string in Email format"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: "Valid password in String type"
  })
  @IsString()
  password: string;
}
