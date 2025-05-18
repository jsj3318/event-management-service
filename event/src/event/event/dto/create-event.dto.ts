import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import {RewardType} from "../../../type/rewardType.enum";

class EventConditionDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  value: number;
}

class EventRewardDto {
  @IsEnum(RewardType)
  type: RewardType;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  itemId?: string;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EventConditionDto)
  conditions: EventConditionDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EventRewardDto)
  rewards: EventRewardDto[];

  @IsDateString()
  startAt: Date;

  @IsDateString()
  endAt: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
