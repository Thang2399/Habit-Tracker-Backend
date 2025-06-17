import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HabitLogDocument, HabitLog } from '../../schema/habit-log.schema';
import { HabitDocument, Habit } from '../../schema/habit.schema';
import { IUser } from '../../interface/user';
import { CreateHabitLogDto } from '../../dto/habit-log/create-habit-log.dto';
import { Response } from 'express';
import {
  HabitFrequencyEnum,
  HabitFrequencyPeriodEnum,
} from '../../enum/habit.enum';
import {
  getPeriodWindow,
  getToday,
  getTodayDateRange,
} from '../../common/utils';
import { IHabit } from '../../interface/habit';

@Injectable()
export class HabitLogService {
  constructor(
    @InjectModel(HabitLog.name) private habitLogModel: Model<HabitLogDocument>,
    @InjectModel(Habit.name) private habitModel: Model<HabitDocument>,
  ) {}

  async createHabitLogDaily(
    specificHabit: IHabit,
    habitId: string,
    userId: string,
    res: Response,
    dto: CreateHabitLogDto,
  ) {
    const { start, end } = getTodayDateRange();

    const specificHabitLog = await this.habitLogModel.findOne({
      userId,
      habitId,
      createdAt: { $gte: start, $lte: end },
    });

    if (!specificHabitLog) {
      let streakDaily: number = specificHabit?.streakDaily || 0;
      let streakDailyStartDate: string =
        specificHabit?.streakDailyStartDate || '';
      let streakDailyEndDate: string = specificHabit?.streakDailyEndDate || '';
      streakDaily += 1;
      // assign streakDailyStartDate at the first day the habit is marked as done
      if (!streakDailyStartDate) {
        streakDailyStartDate = getToday();
      }
      // assign streakDailyEndDate as the day the habit is marked as done
      streakDailyEndDate = getToday();
      await this.habitModel
        .findByIdAndUpdate(
          habitId,
          { streakDaily, streakDailyStartDate, streakDailyEndDate },
          { new: true },
        )
        .exec();
      await this.saveNewHabitLog(dto, userId, res);
    } else {
      throw new BadRequestException('Habit Log exists');
    }
  }

  async createHabitLogPeriod(
    specificHabit: IHabit,
    habitId: string,
    userId: string,
    res: Response,
    dto: CreateHabitLogDto,
  ) {
    const targetCount: number = specificHabit?.targetCount || 1;
    const period = specificHabit.period || HabitFrequencyPeriodEnum.WEEK;
    const { startPeriodWindow, endPeriodWindow } = getPeriodWindow(period);

    const numberOfDoneThisPeriod = specificHabit?.numberOfDoneThisPeriod || 0;

    const streakPeriod = specificHabit?.streakPeriod || 0;

    let update = {};

    if (numberOfDoneThisPeriod < targetCount) {
      update = {
        numberOfDoneThisPeriod: numberOfDoneThisPeriod + 1,
        streakPeriodEndDate: getToday(),
        lastEvaluatedPeriodEnd: endPeriodWindow,
      };

      if (!specificHabit.streakPeriodStartDate) {
        update['streakPeriodStartDate'] = getToday();
      }

      if (numberOfDoneThisPeriod + 1 === targetCount) {
        update['streakPeriod'] = streakPeriod + 1;
      }

      update['currentPeriodStartDate'] = startPeriodWindow;
      update['currentPeriodEndDate'] = endPeriodWindow;
    }

    await this.habitModel.findByIdAndUpdate(habitId, update).exec();
    await this.saveNewHabitLog(dto, userId, res);
  }

  async saveNewHabitLog(dto: CreateHabitLogDto, userId: string, res: Response) {
    const newHabitLogObj = {
      ...dto,
      userId,
    };

    // create new habit log
    const newHabitLog = new this.habitLogModel(newHabitLogObj);
    await newHabitLog.save();
    const response = newHabitLog.toObject();
    return res.json(response);
  }

  async createHabitLog(user: IUser, dto: CreateHabitLogDto, res: Response) {
    const userId = user.userId;
    const habitId = dto.habitId;

    const specificHabit = await this.habitModel.findById(habitId).exec();
    const type = specificHabit?.type || HabitFrequencyEnum.DAILY;

    if (!specificHabit) {
      throw new NotFoundException('No specific habit with this id:', habitId);
    } else {
      // type = daily
      if (type === HabitFrequencyEnum.DAILY) {
        await this.createHabitLogDaily(
          specificHabit,
          habitId,
          userId,
          res,
          dto,
        );
      }
      // type === custom
      else {
        await this.createHabitLogPeriod(
          specificHabit,
          habitId,
          userId,
          res,
          dto,
        );
      }
    }
  }
}
