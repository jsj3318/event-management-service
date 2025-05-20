import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import {Event} from "./event.schema";

const mockEventData = { _id: '1', title: 'test' };

const execMock = jest.fn().mockResolvedValue(mockEventData);
const eventModelMock = {
  findById: jest.fn().mockReturnValue({ exec: execMock }),
  constructor: jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(mockEventData),
  })),
};

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        { provide: getModelToken(Event.name), useValue: eventModelMock },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('이벤트 단건 조회', async () => {
    const mockFoundEvent = { _id: '1', title: 'found' };
    eventModelMock.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockFoundEvent),
    });

    const result = await service.findById('1');
    expect(result).toEqual(mockFoundEvent);
    expect(eventModelMock.findById).toHaveBeenCalledWith('1');
  });

  it('이벤트 없으면 NotFoundException 던짐', async () => {
    eventModelMock.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.findById('nonexistent')).rejects.toThrow('해당 이벤트를 찾을 수 없습니다');
  });

  describe('isActive', () => {
    it('이벤트 활성 여부 조회', async () => {
      const now = new Date();
      const mockEvent = {
        isActive: true,
        startAt: new Date(now.getTime() - 1000),
        endAt: new Date(now.getTime() + 1000),
      };
      eventModelMock.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvent),
      });

      const result = await service.isActive('1');
      expect(result).toBe(true);
    });

    it('이벤트 없으면 NotFoundException 던짐', async () => {
      eventModelMock.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.isActive('404')).rejects.toThrow('해당하는 이벤트가 존재하지 않습니다');
    });
  });
});
