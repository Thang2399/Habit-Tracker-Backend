import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationTemplate,
  NotificationTemplateSchema,
} from '../../schema/notification-template.schema';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { HabitSchema, Habit } from '../../schema/habit.schema';
import {
  NotificationSchema,
  Notification,
} from '../../schema/notification.schema';
import { PaginationModule } from '../pagination/pagination.module';
import { PaginationService } from '../pagination/pagination.service';
import { NotificationCronService } from './cron/notification-cron.service';
import { HabitLogModule } from '../habit-log/habit-log.module';
import { HabitLogService } from '../habit-log/habit-log.service';
import { HabitLogController } from '../habit-log/habit-log.controller';
import { HabitLogSchema, HabitLog } from '../../schema/habit-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationTemplate.name, schema: NotificationTemplateSchema },
      { name: Habit.name, schema: HabitSchema },
      { name: HabitLog.name, schema: HabitLogSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
    PaginationModule,
    HabitLogModule,
  ],
  controllers: [NotificationController, HabitLogController],
  providers: [
    NotificationService,
    PaginationService,
    NotificationCronService,
    HabitLogService,
  ],
})
export class NotificationModule {}
