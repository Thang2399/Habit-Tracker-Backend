import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateIf, Min } from 'class-validator';
import {
  HabitFrequencyEnum,
  HabitFrequencyPeriodEnum,
} from '../enum/habit.enum';
import { IHabit } from '../interface/habit';

export class CreateHabitDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ default: HabitFrequencyEnum.DAILY })
  @Expose()
  @IsEnum(HabitFrequencyEnum)
  type: string = HabitFrequencyEnum.DAILY;

  @ValidateIf((o: IHabit) => o.type === HabitFrequencyEnum.CUSTOM)
  @ApiProperty({ default: HabitFrequencyPeriodEnum.WEEK })
  @Expose()
  @IsEnum(HabitFrequencyPeriodEnum)
  period?: HabitFrequencyPeriodEnum;

  @ValidateIf((o: IHabit) => o.type === HabitFrequencyEnum.CUSTOM)
  @ApiProperty({ default: 1 })
  @Expose()
  @Min(1)
  targetCount?: number = 1;
}
