import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationTemplateEnum } from '../../enum/notification.enum';

export class CreateNotificationTemplateDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ default: NotificationTemplateEnum.DAILY_REMINDER })
  @Expose()
  @IsEnum(NotificationTemplateEnum)
  notificationTemplateType?: NotificationTemplateEnum;
}
