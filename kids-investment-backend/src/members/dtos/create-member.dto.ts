import {IsEmail, IsString} from 'class-validator';

export class CreateMemberDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
