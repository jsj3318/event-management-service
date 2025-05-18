import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(
      @Param('id') id: string
  ) {
    return this.userService.findById(id);
  }

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query() filters?: any,
  ) {
    return this.userService.findAll(page, limit, sortBy, sortOrder, filters);
  }

  @Post()
  async create(
      @Body() userData: CreateUserDto
  ) {
    return this.userService.create(userData);
  }

}
