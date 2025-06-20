import { Module } from '@nestjs/common';
import { ApiConfigServices } from './config/api/api-config.service';
import { ApiConfigModule } from './config/api/api-config.module';
import { HealthModule } from './module/health/health.module';
import { MongoModule } from './module/mongo/mongo.module';
import { HabitModule } from './module/habit/habit.module';
import { HabitLogModule } from './module/habit-log/habit-log.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './module/notification/notification.module';
import { PaginationModule } from './module/pagination/pagination.module';

@Module({
  imports: [
    ApiConfigModule,
    HealthModule,
    MongoModule,
    HabitModule,
    HabitLogModule,
    ScheduleModule.forRoot(),
    NotificationModule,
    PaginationModule
  ],
  controllers: [],
  providers: [ApiConfigServices],
})
export class AppModule {}
