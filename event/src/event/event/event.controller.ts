import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {EventService} from "./event.service";
import {CreateEventDto} from "./dto/create-event.dto";

@Controller('api/event')
export class EventController {
    constructor(private readonly eventService: EventService) {
    }

    @Get()
    findAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('sortBy') sortBy?: string,
        @Query('sortOrder') sortOrder?: 'asc' | 'desc',
        @Query() filters?: any,
    ) {
        return this.eventService.findAll(page, limit, sortBy, sortOrder, filters);
    }

    @Get(':id')
    async findById(
        @Param('id') id: string,
    ) {
        return this.eventService.findById(id);
    }

    @Post()
    async create(
        @Body() eventData: CreateEventDto,
    ) {
        return this.eventService.create(eventData);
    }

}
