import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IncreaseConditionProgressDto {

    @IsString()
    @ApiProperty({ description: '조건 타입', example: 'INVITE_COUNT'})
    type: string;

    @IsNumber()
    @Min(1)
    @ApiProperty({ description: '증가할 조건 수치', example: 1, minimum: 1 })
    amount: number;
}
