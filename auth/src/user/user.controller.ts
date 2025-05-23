import {Controller, Get, Param, Query, Post, Body} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "../type/role.enum";

@ApiTags('User')
@Controller('api/auth/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: '유저 단건 조회'})
  @ApiResponse({ status: 200, description: '유저 정보 반환 완료' })
  @ApiResponse({ status: 404, description: '유저 없음' })
  @ApiBearerAuth()
  @Get(':id')
  async findById(
      @Param('id') id: string
  ) {
    return this.userService.findById(id);
  }

  @ApiOperation({summary: '유저 페이지 조회'})
  @ApiQuery({ name: 'page', required: false, description: '페이지 번호' })
  @ApiQuery({ name: 'size', required: false, description: '페이지당 항목 수' })
  @ApiQuery({ name: 'sortBy', required: false, description: '정렬 기준 필드' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: '정렬 순서' })
  @ApiQuery({ name: 'email', required: false, description: '이메일' })
  @ApiQuery({ name: 'role', required: false, description: '권한', enum: Role })
  @ApiQuery({ name: 'nickname', required: false, description: '닉네임' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: '유저 정보 페이지 반환 완료' })
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('size') size?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query() filters?: any,
  ) {
    return this.userService.findAll(page, size, sortBy, sortOrder, filters);
  }

  @ApiOperation({summary: '유저 등록'})
  @ApiResponse({ status: 201, description: '회원가입 완료' })
  @ApiResponse({ status: 409, description: '이메일 또는 닉네임 중복' })
  @Post()
  async create(
      @Body() userData: CreateUserDto
  ) {
    return this.userService.create(userData);
  }

}
