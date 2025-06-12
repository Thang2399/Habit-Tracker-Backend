import { IsEnum, IsNumber, IsString, Min, ValidateIf } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  HabitFrequencyEnum,
  HabitFrequencyPeriodEnum,
} from '../enum/habit.enum';
import { IHabit } from '../interface/habit';

export class UpdateHabitDto {
  @ApiProperty({ default: '' })
  @Expose()
  @IsString()
  title?: string;

  @ApiProperty({ default: HabitFrequencyEnum.DAILY })
  @Expose()
  @IsString()
  type?: string;

  @ApiProperty({ default: 0 })
  @Expose()
  @IsNumber()
  streak?: number;

  @ValidateIf((o: IHabit) => o.type === HabitFrequencyEnum.CUSTOM)
  @ApiProperty()
  @Expose()
  @IsEnum(HabitFrequencyPeriodEnum)
  period?: HabitFrequencyPeriodEnum;

  @ValidateIf((o: IHabit) => o.type === HabitFrequencyEnum.CUSTOM)
  @ApiProperty({ default: 1 })
  @Expose()
  @Min(1)
  targetCount?: number = 1;
}
