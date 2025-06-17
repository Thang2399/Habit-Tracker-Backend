import {
  HabitFrequencyEnum,
  HabitFrequencyPeriodEnum,
} from '../enum/habit.enum';

export interface IHabit {
  id?: string;
  userId: string;
  title: string;
  type: HabitFrequencyEnum;
  period?: HabitFrequencyPeriodEnum;
  targetCount?: number;
  createdAt?: string;
  updatedAt?: string;

  streakDaily?: number;
  streakDailyStartDate?: string;
  streakDailyEndDate?: string;

  streakPeriod?: number;
  streakPeriodStartDate?: string;
  streakPeriodEndDate?: string;
  currentPeriodStartDate?: string;
  currentPeriodEndDate?: string;
  lastEvaluatedPeriodEnd?: string;
  numberOfDoneThisPeriod?: number;
}
