import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitLogService } from './habit-log.service';
import { HabitSchema, Habit } from '../../schema/habit.schema';
import { HabitLogSchema, HabitLog } from '../../schema/habit-log.schema';
import { HabitService } from '../habit/habit.service';
import { HabitLogController } from './habit-log.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HabitLog.name, schema: HabitLogSchema },
      { name: Habit.name, schema: HabitSchema },
    ]),
  ],
  controllers: [HabitLogController],
  providers: [HabitLogService, HabitService],
})
export class HabitLogModule {}
