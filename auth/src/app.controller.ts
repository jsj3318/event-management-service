import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {LoginRequest} from "./user/dto/login-request.dto";
import {UserService} from "./user/user.service";

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


}
