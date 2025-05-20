import {Body, Controller, Get, HttpCode, Post, Req} from '@nestjs/common';
import {LoginRequest} from "./user/dto/login-request.dto";
import {UserService} from "./user/user.service";
import {Request} from "express";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiExcludeEndpoint} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('api/auth')
export class AppController {
  constructor(
      private readonly userService: UserService,
  ) {}

  // 로그인 요청
  // jwt 토큰 반환
  @HttpCode(200)
  @ApiOperation({summary: '로그인 요청'})
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 404, description: '없는 이메일' })
  @ApiResponse({ status: 401, description: '패스워드 불일치' })
  @Post('login')
  async login(
      @Body()request: LoginRequest
  ) {
    return this.userService.login(request);
  }

  // 자신의 정보 반환
  @ApiOperation({summary: '내 정보 조회'})
  @ApiResponse({ status: 200, description: '내 정보 조회 성공' })
  @ApiBearerAuth()
  @Get('me')
  async me(
      @Req() req: Request
  ) {
    const userId = req.headers['x-user-id'] as string;
    return this.userService.findById(userId);
  }

  @ApiExcludeEndpoint()
  @Get()
  async getHello(): Promise<string> {
    return 'Hello World!';
  }

}
