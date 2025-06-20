import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guard/auth/auth.guard';
import { NotificationService } from './notification.service';
import { CreateNotificationTemplateDto } from '../../dto/notification/create-notification-template.dto';
import { CurrentUser } from '../../decorator/user.decorator';
import { IUser } from '../../interface/user';
import { Response } from 'express';
import { CreateUpdateNotificationDto } from '../../dto/notification/create-notification.dto';
import { GetListNotificationsTemplateDto } from '../../dto/notification/get-list-notifications-template.dto';
import { GetListNotificationDto } from '../../dto/notification/get-list-notifications.dto';

@ApiBearerAuth()
@ApiTags('Notification')
@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @ApiOperation({ description: 'create notification' })
  @ApiBody({ type: CreateUpdateNotificationDto })
  @Post('/create')
  async createNotification(
    @CurrentUser() user: IUser,
    @Body() dto: CreateUpdateNotificationDto,
    @Res() res: Response,
  ) {
    return this.notificationService.createNotification(user.userId, dto, res);
  }

  @ApiOperation({ description: 'get list notifications' })
  @Get('')
  async getListNotifications(
    @CurrentUser() user: IUser,
    @Query() query: GetListNotificationDto,
    @Res() res: Response,
  ) {
    return this.notificationService.getListNotifications(user, query, res);
  }

  @ApiOperation({ description: 'create notification template' })
  @ApiBody({ type: CreateNotificationTemplateDto })
  @Post('/create-template')
  async createNotificationTemplate(
    @Body() dto: CreateNotificationTemplateDto,
    @Res() res: Response,
  ) {
    return await this.notificationService.createNotificationTemplate(dto, res);
  }

  @ApiOperation({ description: 'get list notifications template' })
  @Get('/template')
  async getListNotificationsTemplate(
    @CurrentUser() user: IUser,
    @Query() query: GetListNotificationsTemplateDto,
    @Res() res: Response,
  ) {
    return await this.notificationService.getListNotificationsTemplate(
      user,
      query,
      res,
    );
  }

  @ApiOperation({ description: 'get detail notification template' })
  @ApiParam({
    name: 'id',
    description: 'Notification Template id',
    type: String,
  })
  @Get('/template/:id')
  async getDetailNotificationTemplate(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    return this.notificationService.getDetailNotificationTemplate(id, res);
  }

  @ApiOperation({ description: 'update notification template' })
  @ApiBody({ type: CreateNotificationTemplateDto })
  @Put('/update-template/:id')
  @ApiParam({
    name: 'id',
    description: 'Notification Template id',
    type: String,
  })
  async updateNotificationTemplate(
    @Param('id') id: string,
    @Body() dto: CreateNotificationTemplateDto,
    @Res() res: Response,
  ) {
    return this.notificationService.updateNotificationTemplate(id, dto, res);
  }

  @ApiOperation({ description: 'delete notification template' })
  @ApiParam({
    name: 'id',
    description: 'Notification Template id',
    type: String,
  })
  @Delete('/delete-template/:id')
  async deleteNotificationTemplate(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    return this.notificationService.deleteNotificationTemplate(id, res);
  }
}
