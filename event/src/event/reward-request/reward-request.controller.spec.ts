import { Test, TestingModule } from '@nestjs/testing';
import { RewardRequestController } from './reward-request.controller';
import { RewardRequestService } from './reward-request.service';

describe('RewardRequestController', () => {
  let controller: RewardRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardRequestController],
      providers: [RewardRequestService],
    }).compile();

    controller = module.get<RewardRequestController>(RewardRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
