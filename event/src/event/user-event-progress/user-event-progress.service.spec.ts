import { Test, TestingModule } from '@nestjs/testing';
import { UserEventProgressService } from './user-event-progress.service';

describe('UserEventProgressService', () => {
  let service: UserEventProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEventProgressService],
    }).compile();

    service = module.get<UserEventProgressService>(UserEventProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
