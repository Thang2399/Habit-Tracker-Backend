import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUpdateNotificationDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  habitId: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  notificationTemplateId: string;
}
