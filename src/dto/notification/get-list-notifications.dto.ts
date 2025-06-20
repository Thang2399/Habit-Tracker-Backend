import { PaginationDto } from '../pagination/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetListNotificationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  message?: string;
}
