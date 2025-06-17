import { Module } from '@nestjs/common';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';
import { Habit, HabitSchema } from '../../schema/habit.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitCronService } from './cron/habit-cron.service';
import { HabitLog, HabitLogSchema } from '../../schema/habit-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Habit.name, schema: HabitSchema },
      { name: HabitLog.name, schema: HabitLogSchema },
    ]),
  ],
  controllers: [HabitController],
  providers: [HabitService, HabitCronService],
})
export class HabitModule {}
