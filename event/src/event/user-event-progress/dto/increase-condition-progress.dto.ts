import { IsString, IsNumber, Min } from 'class-validator';

export class IncreaseConditionProgressDto {
    @IsString()
    type: string;

    @IsNumber()
    @Min(1)
    amount: number;
}
