import { Test, TestingModule } from '@nestjs/testing';
import { UserEventProgressController } from './user-event-progress.controller';

describe('UserEventProgressController', () => {
  let controller: UserEventProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEventProgressController],
    }).compile();

    controller = module.get<UserEventProgressController>(UserEventProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
