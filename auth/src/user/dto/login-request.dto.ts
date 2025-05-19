import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginRequest {

  @ApiProperty({
    description: '이메일',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: '패스워드',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

}
