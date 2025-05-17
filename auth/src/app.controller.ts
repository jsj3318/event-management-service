import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import { AppService } from './app.service';
import {LoginRequest} from "./user/dto/login-request.dto";
import {UserService} from "./user/user.service";
import {Request} from "express";

@Controller('auth')
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 로그인 요청
  // jwt 토큰 반환
  @Post('login')
  async login(
      @Body()request: LoginRequest
  ) {
    return this.userService.login(request);
  }

  // 자신의 정보 반환
  @Get('me')
  async me(
      @Req() req: Request
  ) {
    const userId = req.headers['x-user-id'] as string;
    return this.userService.findById(userId);
  }


}
