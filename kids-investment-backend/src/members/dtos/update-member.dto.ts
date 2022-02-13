import {IsEmail, IsNumber, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateMemberDto {
  @ApiProperty({
    type: Number,
    description: "Database generated ID"
  })
  @IsNumber()
  id: number;

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
