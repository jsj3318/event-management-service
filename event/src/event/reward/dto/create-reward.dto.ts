import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {RewardType} from "../../../type/rewardType.enum";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRewardDto {
    @ApiProperty({ enum: RewardType, description: '보상 타입', example: 'ITEM' })
    @IsEnum(RewardType)
    type: RewardType;

    @ApiProperty({ description: '지급 수량 또는 포인트 값', example: 10 })
    @IsNumber()
    amount: number;

    @ApiPropertyOptional({ description: '단위', example: '개' })
    @IsOptional()
    @IsString()
    unit?: string;

    @ApiPropertyOptional({ description: '아이템 타입일 경우 아이템 ID', example: 'item_100' })
    @IsOptional()
    @IsString()
    itemId?: string;
}
