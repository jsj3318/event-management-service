import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateEventDto } from './dto/create-event.dto';
import { Event, EventDocument } from "./event.schema";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async findById(id: string): Promise<Event | null> {
    return this.eventModel.findById(id).exec();
  }

  async findAll(
    page = 1,
    size = 10,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    filters: Record<string, any> = {},
  ): Promise<{ data: Event[]; total: number }> {
    const skip = (page - 1) * size;
    const query =
        this.eventModel
            .find(filters)
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(size);

    const [data, total] = await Promise.all([
      query.exec(),
      this.eventModel.countDocuments(filters).exec(),
    ]);

    return { data, total };
  }

}
