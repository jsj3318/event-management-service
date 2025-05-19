import {Controller, Get, Param, Query, Post, Body, HttpCode} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('user')
@Controller('api/auth/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({summary: '유저 단건 조회'})
  @ApiResponse({ status: 200, description: '유저 정보 반환 완료' })
  async findById(
      @Param('id') id: string
  ) {
    return this.userService.findById(id);
  }

  @Get()
  @ApiOperation({summary: '유저 페이지 조회'})
  @ApiQuery({ name: 'page', required: false, description: '페이지 번호' })
  @ApiQuery({ name: 'size', required: false, description: '페이지당 항목 수' })
  @ApiQuery({ name: 'sortBy', required: false, description: '정렬 기준 필드' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: '정렬 순서' })
  @ApiResponse({ status: 200, description: '유저 정보 페이지 반환 완료' })
  async findAll(
    @Query('page') page?: number,
    @Query('size') size?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query() filters?: any,
  ) {
    return this.userService.findAll(page, size, sortBy, sortOrder, filters);
  }

  @Post()
  @ApiOperation({summary: '유저 등록'})
  @ApiResponse({ status: 201, description: '회원가입 완료' })
  @ApiResponse({ status: 409, description: '이메일 또는 닉네임 중복' })
  async create(
      @Body() userData: CreateUserDto
  ) {
    return this.userService.create(userData);
  }

}
