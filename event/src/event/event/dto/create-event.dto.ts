import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import {Transform, Type} from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class EventConditionDto {
  @ApiProperty({ description: '조건 타입' , example: 'INVITE_COUNT'})
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: '조건 목표 값', example: 3 })
  @IsNumber()
  value: number;
}

export class CreateEventDto {
  @ApiProperty({ description: '이벤트 제목', example: '친구 초대 이벤트' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '이벤트 타입', example: 'INVITE' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({ description: '이벤트 설명', example: '친구 초대하고 3천 포인트 받기' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '이벤트 조건들', type: [EventConditionDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EventConditionDto)
  conditions: EventConditionDto[];

  @ApiProperty({ description: '이벤트 시작 시간', example: '2025-05-01T00:00:00Z' })
  @IsDateString()
  startAt: Date;

  @ApiProperty({ description: '이벤트 종료 시간', example: '2025-05-31T23:59:59Z' })
  @IsDateString()
  endAt: Date;

  @ApiPropertyOptional({ description: '이벤트 활성화 여부', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value ?? false)
  isActive?: boolean;
}
