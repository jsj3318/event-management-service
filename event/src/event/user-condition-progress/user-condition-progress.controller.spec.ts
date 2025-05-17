import { Test, TestingModule } from '@nestjs/testing';
import { UserConditionProgressController } from './user-condition-progress.controller';

describe('UserConditionProgressController', () => {
  let controller: UserConditionProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserConditionProgressController],
    }).compile();

    controller = module.get<UserConditionProgressController>(UserConditionProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
