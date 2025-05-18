import { Controller } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';

@Controller('reward-request')
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}
}
