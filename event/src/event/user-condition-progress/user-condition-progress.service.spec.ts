import { Test, TestingModule } from '@nestjs/testing';
import { UserConditionProgressService } from './user-condition-progress.service';

describe('UserConditionProgressService', () => {
  let service: UserConditionProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserConditionProgressService],
    }).compile();

    service = module.get<UserConditionProgressService>(UserConditionProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
