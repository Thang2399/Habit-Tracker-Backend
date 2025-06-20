import { PaginationDto } from '../pagination/pagination.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { NotificationTemplateEnum } from '../../enum/notification.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetListNotificationsTemplateDto extends PaginationDto {
  @IsOptional()
  @IsEnum(NotificationTemplateEnum)
  @ApiProperty({
    enum: NotificationTemplateEnum,
    default: NotificationTemplateEnum.DAILY_REMINDER,
    required: false,
  })
  notificationTemplateType?: string;
}
