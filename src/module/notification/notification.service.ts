import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import {
  NotificationTemplate,
  NotificationTemplateDocument,
} from '../../schema/notification-template.schema';
import { Model } from 'mongoose';
import { CreateNotificationTemplateDto } from '../../dto/notification/create-notification-template.dto';
import { Response } from 'express';
import { IUser } from '../../interface/user';
import { Habit, HabitDocument } from '../../schema/habit.schema';
import { CreateUpdateNotificationDto } from '../../dto/notification/create-notification.dto';
import {
  Notification,
  NotificationDocument,
} from '../../schema/notification.schema';
import { formatMessage } from '../../common/utils';
import { GetListNotificationsTemplateDto } from '../../dto/notification/get-list-notifications-template.dto';
import { PaginationService } from '../pagination/pagination.service';
import { GetListNotificationDto } from '../../dto/notification/get-list-notifications.dto';
import { HabitFrequencyEnum } from '../../enum/habit.enum';
import { NotificationTemplateEnum } from '../../enum/notification.enum';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationTemplate.name)
    private notificationTemplateModel: Model<NotificationTemplateDocument>,
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel(Habit.name)
    private habitModel: Model<HabitDocument>,
    private paginationService: PaginationService,
  ) {}

  async findSpecificNotificationTemplate(id) {
    const specificNotificationTemplate = await this.notificationTemplateModel
      .findById(id)
      .exec();

    if (!specificNotificationTemplate) {
      throw new BadRequestException(
        `No specific notification template found width notificationTemplateId: ${id}`,
      );
    }
    return specificNotificationTemplate;
  }

  async createNotificationTemplate(
    dto: CreateNotificationTemplateDto,
    res: Response,
  ) {
    const { title } = dto;
    const specificNotification = await this.notificationModel
      .findOne({ title })
      .exec();

    if (specificNotification) {
      throw new BadRequestException('Duplicate notification template');
    } else {
      const newTemplateNotification = new this.notificationTemplateModel(dto);
      await newTemplateNotification.save();
      const newTemplateNotificationRes = newTemplateNotification.toObject();
      return res.json({
        statusCode: HttpStatus.CREATED,
        data: newTemplateNotificationRes,
      });
    }
  }

  async createNewNotification(
    dto: CreateUpdateNotificationDto,
    userId: string,
  ) {
    const { habitId, notificationTemplateId } = dto;
    const specificHabit = await this.habitModel.findById(habitId).exec();
    const specificNotificationTemplate =
      await this.findSpecificNotificationTemplate(notificationTemplateId);

    if (!specificHabit) {
      throw new BadRequestException(`No habit exists with id ${habitId}`);
    }

    const templateMessage = specificNotificationTemplate.message;
    const formatMessageObj: any = {
      habitTitle: specificHabit.title,
    };

    if (specificHabit.type !== HabitFrequencyEnum.DAILY) {
      formatMessageObj.period = specificHabit.period;
      formatMessageObj.targetCount = specificHabit.targetCount;
      formatMessageObj.currentCount = specificHabit.numberOfDoneThisPeriod;
    }
    const message: string = formatMessage(templateMessage, formatMessageObj);

    const body = {
      userId,
      habitId,
      notificationTemplateId,
      title: specificNotificationTemplate.title,
      message,
      notificationTemplateType:
        specificNotificationTemplate.notificationTemplateType,
    };

    const newNotification = new this.notificationModel(body);
    await newNotification.save();
    return newNotification;
  }

  async createNotification(
    userId: string,
    dto: CreateUpdateNotificationDto,
    res: Response,
  ) {
    const newNotification = await this.createNewNotification(dto, userId);

    return res.json({
      HttpStatus: HttpStatus.CREATED,
      data: newNotification,
    });
  }

  async getListNotificationsTemplate(
    user: IUser,
    query: GetListNotificationsTemplateDto,
    res: Response,
  ) {
    const listNotificationsTemplate =
      await this.paginationService.getPaginationData(
        this.notificationTemplateModel,
        query,
      );

    return res.json(listNotificationsTemplate);
  }

  async getDetailNotificationTemplate(id: string, res: Response) {
    const specificNotificationTemplate =
      await this.findSpecificNotificationTemplate(id);
    const data = specificNotificationTemplate.toObject();
    return res.json({
      statusCode: HttpStatus.OK,
      data,
    });
  }

  async updateNotificationTemplate(
    id: string,
    dto: CreateNotificationTemplateDto,
    res: Response,
  ) {
    await this.findSpecificNotificationTemplate(id);
    const { title } = dto;

    const specificNotificationTemplateTitle =
      await this.notificationTemplateModel.findOne({ title }).exec();

    if (
      specificNotificationTemplateTitle &&
      specificNotificationTemplateTitle.id !== id
    ) {
      throw new BadRequestException(`Duplicate title`);
    }
    await this.notificationTemplateModel.findByIdAndUpdate(id, dto).exec();
    return res.json({
      statusCode: HttpStatus.CREATED,
    });
  }

  async deleteNotificationTemplate(id: string, res: Response) {
    await this.findSpecificNotificationTemplate(id);
    await this.notificationTemplateModel.findByIdAndDelete(id).exec();
    return res.json({
      statusCode: HttpStatus.NO_CONTENT,
    });
  }

  async getListNotifications(
    user: IUser,
    query: GetListNotificationDto,
    res: Response,
  ) {
    const listNotifications = await this.paginationService.getPaginationData(
      this.notificationModel,
      query,
      user.userId,
    );

    return res.json(listNotifications);
  }

  async createRandomNotification(
    notificationTemplateType: NotificationTemplateEnum,
    habitId: any,
    userId: string,
  ) {
    const listNotificationTemplate = await this.notificationTemplateModel
      .find({
        notificationTemplateType,
      })
      .lean()
      .exec();

    const randomIndex = Math.floor(
      Math.random() *
        (Math.floor(Math.random() * listNotificationTemplate.length) + 1),
    );
    const randomNotificationTemplate = listNotificationTemplate[randomIndex];
    const randomNotificationTemplateId = randomNotificationTemplate._id;
    const body = {
      habitId: habitId.toString(),
      notificationTemplateId: randomNotificationTemplateId.toString(),
    };
    const newNotification = await this.createNewNotification(body, userId);
    return newNotification;
  }
}
