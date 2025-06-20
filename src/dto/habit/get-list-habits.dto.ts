import { IsEnum, IsOptional } from 'class-validator';
import {
  HabitFrequencyEnum,
  HabitFrequencyPeriodEnum,
} from '../../enum/habit.enum';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../pagination/pagination.dto';

export class GetListHabitsDto extends PaginationDto {
  @IsOptional()
  @IsEnum(HabitFrequencyEnum)
  @ApiProperty({
    enum: HabitFrequencyEnum,
    default: HabitFrequencyEnum.DAILY,
    required: false,
  })
  habitType?: string;

  @IsOptional()
  @IsEnum(HabitFrequencyPeriodEnum)
  @ApiProperty({
    enum: HabitFrequencyPeriodEnum,
    default: HabitFrequencyPeriodEnum.WEEK,
    required: false,
  })
  habitPeriod?: string;
}
