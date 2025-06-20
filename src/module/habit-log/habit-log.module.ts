import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitLogService } from './habit-log.service';
import { HabitSchema, Habit } from '../../schema/habit.schema';
import { HabitLogSchema, HabitLog } from '../../schema/habit-log.schema';
import { HabitService } from '../habit/habit.service';
import { HabitLogController } from './habit-log.controller';
import { PaginationModule } from '../pagination/pagination.module';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HabitLog.name, schema: HabitLogSchema },
      { name: Habit.name, schema: HabitSchema },
    ]),
    PaginationModule
  ],
  controllers: [HabitLogController],
  providers: [HabitLogService, HabitService, PaginationService],
})
export class HabitLogModule {}
