import {Body, Controller, Get, Param, Post, Query, Patch} from '@nestjs/common';
import {EventService} from "./event.service";
import {CreateEventDto} from "./dto/create-event.dto";
import { PartialType } from '@nestjs/mapped-types';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

export class UpdateEventDto extends PartialType(CreateEventDto) {}

@ApiTags('event')
@Controller('api/event')
export class EventController {
    constructor(private readonly eventService: EventService) {
    }

    @Get()
    @ApiOperation({summary: '이벤트 페이지 조회'})
    @ApiQuery({ name: 'page', required: false, description: '페이지 번호' })
    @ApiQuery({ name: 'size', required: false, description: '페이지당 항목 수' })
    @ApiQuery({ name: 'sortBy', required: false, description: '정렬 기준 필드' })
    @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: '정렬 순서' })
    @ApiQuery({ name: 'title', required: false, description: '이벤트 제목' })
    @ApiQuery({ name: 'type', required: false, description: '이벤트 타입' })
    @ApiQuery({ name: 'isActive', required: false, description: '활성 여부', type: 'boolean' })
    @ApiResponse({ status: 200, description: '이벤트 페이지 조회 성공' })
    findAll(
        @Query('page') page?: number,
        @Query('size') size?: number,
        @Query('sortBy') sortBy?: string,
        @Query('sortOrder') sortOrder?: 'asc' | 'desc',
        @Query() filters?: any,
    ) {
        return this.eventService.findAll(page, size, sortBy, sortOrder, filters);
    }

    @Get(':id')
    @ApiOperation({summary: '이벤트 단건 조회'})
    @ApiResponse({ status: 200, description: '이벤트 단건 조회 성공' })
    async findById(
        @Param('id') id: string,
    ) {
        return this.eventService.findById(id);
    }

    @Post()
    @ApiOperation({summary: '이벤트 생성'})
    @ApiResponse({ status: 200, description: '이벤트 생성 완료' })
    @ApiBearerAuth()
    async create(
        @Body() eventData: CreateEventDto,
    ) {
        return this.eventService.create(eventData);
    }

    @Patch(':id')
    @ApiOperation({summary: '이벤트 수정'})
    @ApiResponse({ status: 200, description: '이벤트 수정 완료' })
    @ApiResponse({ status: 404, description: '이벤트 없음' })
    @ApiBody({
        type: UpdateEventDto,
        examples: {
            default: {
                summary: '활성 상태 변경',
                value: {
                    isActive: true
                }
            },
        }
    })
    @ApiBearerAuth()
    async update(
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto
    ) {
        return this.eventService.update(id, updateEventDto);
    }

}
