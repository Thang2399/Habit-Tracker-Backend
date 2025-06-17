import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Habit, HabitDocument } from '../../../schema/habit.schema';
import { Model } from 'mongoose';
import { HabitLog, HabitLogDocument } from '../../../schema/habit-log.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { getPeriodWindow, getTodayDateRange } from '../../../common/utils';
import {
  HabitFrequencyEnum,
  HabitFrequencyPeriodEnum,
} from '../../../enum/habit.enum';

@Injectable()
export class HabitCronService {
  private readonly logger = new Logger(HabitCronService.name);

  constructor(
    @InjectModel(Habit.name) private habitModel: Model<HabitDocument>,
    @InjectModel(HabitLog.name) private habitLogModel: Model<HabitLogDocument>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async handleResetDailyStreak() {
    this.logger.debug('Called every day at midnight');
    const { start, end } = getTodayDateRange();
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
        await this.habitModel.findByIdAndUpdate(habit._id, {
          streakDaily: 0,
        });

        this.logger.log(`Streak reset for habit ${habit._id}`);
      }
    }
  }

  async handleResetPeriodStreak(period: HabitFrequencyPeriodEnum) {
    const { startPeriodWindow, endPeriodWindow } = getPeriodWindow(period);

    const allPeriodHabits = await this.habitModel
      .find({
        type: HabitFrequencyEnum.CUSTOM,
        period,
      })
      .lean()
      .exec();

    for (const habit of allPeriodHabits) {
      const targetCount = habit?.targetCount || 0;
      const numberOfDoneThisPeriod = habit?.numberOfDoneThisPeriod || 0;

      if (numberOfDoneThisPeriod < targetCount) {
        await this.habitModel.findByIdAndUpdate(habit._id, {
          streakPeriod: 0,
        });
        this.logger.debug(
          `Reset streak for period: ${period} with habit._id: ${habit._id}`,
        );
      } else {
        await this.habitModel.findByIdAndUpdate(habit._id, {
          numberOfDoneThisPeriod: 0,
          currentPeriodStartDate: startPeriodWindow,
          currentPeriodEndDate: endPeriodWindow,
        });
        this.logger.debug(
          `Update streak for period: ${period} with habit._id: ${habit._id}`,
        );
      }
    }
  }

  @Cron('0 0 * * 1', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async handleResetWeeklyStreak() {
    this.logger.debug('Called every monday at midnight');
    await this.handleResetPeriodStreak(HabitFrequencyPeriodEnum.WEEK);
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async handleResetMonthlyStreak() {
    this.logger.debug('Called every first day of the month at midnight');
    await this.handleResetPeriodStreak(HabitFrequencyPeriodEnum.MONTH);
  }
}



