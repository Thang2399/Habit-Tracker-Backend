import {
  HabitFrequencyEnum,
  HabitFrequencyPeriodEnum,
} from '../enum/habit.enum';

export interface IHabit {
  id: string;
  userId: string;
  title: string;
  streak?: number;
  type: HabitFrequencyEnum;
  period?: HabitFrequencyPeriodEnum;
  targetCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
