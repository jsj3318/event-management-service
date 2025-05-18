import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {RewardType} from "../../../type/rewardType.enum";

export class CreateRewardDto {
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
