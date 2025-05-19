import {Injectable, NotFoundException} from '@nestjs/common';
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

  async findById(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException('해당 이벤트를 찾을 수 없습니다');
    }
    return event;
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

  async isActive(id: string): Promise<boolean> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) throw new NotFoundException('해당하는 이벤트가 존재하지 않습니다');

    const now = new Date();
    return event.isActive && now >= event.startAt && now <= event.endAt;
  }


  async update(id: string, updateEventDto: Partial<CreateEventDto>): Promise<Event> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(
      id,
      { $set: updateEventDto },
      { new: true },
    ).exec();

    if (!updatedEvent) {
      throw new NotFoundException('해당 이벤트를 찾을 수 없습니다');
    }

    return updatedEvent;
  }


}
