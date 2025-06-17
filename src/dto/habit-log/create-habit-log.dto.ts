import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class CreateHabitLogDto {
  @ApiProperty({ required: true })
  @Expose()
  @IsUUID()
  habitId: string;

  @ApiProperty({ required: true, default: false })
  @Expose()
  isCompleted: boolean;

  @ApiProperty({ default: '' })
  @Expose()
  mood?: string;
}
