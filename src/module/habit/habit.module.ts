import { Module } from '@nestjs/common';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';
import { Habit, HabitSchema } from '../../schema/habit.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Habit.name, schema: HabitSchema },
    ]),
  ],
  controllers: [HabitController],
  providers: [HabitService],
})
export class HabitModule {}
