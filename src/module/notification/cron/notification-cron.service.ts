import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from '../../../schema/notification.schema';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HabitDocument, Habit } from '../../../schema/habit.schema';
import { getTodayDateRange } from '../../../common/utils';
import { HabitFrequencyEnum } from '../../../enum/habit.enum';
import {
  NotificationTemplateDocument,
  NotificationTemplate,
} from '../../../schema/notification-template.schema';
import { NotificationTemplateEnum } from '../../../enum/notification.enum';
import { NotificationService } from '../notification.service';
import { HabitLogDocument, HabitLog } from '../../../schema/habit-log.schema';
import { Response } from 'express';

@Injectable()
export class NotificationCronService {
  private readonly logger = new Logger(NotificationCronService.name);

  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel(NotificationTemplate.name)
    private notificationTemplateModel: Model<NotificationTemplateDocument>,
    @InjectModel(Habit.name) private habitModel: Model<HabitDocument>,
    @InjectModel(HabitLog.name) private habitLogModel: Model<HabitLogDocument>,
    private notificationService: NotificationService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8PM, {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async handleSendDailyReminderNotification() {
    this.logger.debug('run handleSendDailyReminderNotification');
    const { start, end } = getTodayDateRange(19);

    const allDailyHabits = await this.habitModel
      .find({ type: HabitFrequencyEnum.DAILY })
      .lean()
      .exec();

    for (const habit of allDailyHabits) {
      const specificLog = await this.habitLogModel.findOne({
        userId: habit.userId,
        habitId: habit._id,
        createdAt: { $gte: start, $lte: end },
      });

      if (!specificLog) {
        const newNotification =
          await this.notificationService.createRandomNotification(
            NotificationTemplateEnum.DAILY_REMINDER,
            habit._id,
            habit.userId,
          );
        return newNotification;
      }
    }
  }
}
