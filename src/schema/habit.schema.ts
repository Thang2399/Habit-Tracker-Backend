import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HabitFrequencyEnum,
  HabitFrequencyPeriodEnum,
} from '../enum/habit.enum';

export type HabitDocument = HydratedDocument<Habit>;

@Schema({ timestamps: true })
export class Habit {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: 0 })
  streakDaily?: number;

  @Prop({ default: '' })
  streakDailyStartDate?: string;

  @Prop({ default: '' })
  streakDailyEndDate?: string;

  @Prop({ required: true, default: 0 })
  streakPeriod?: number;

  @Prop({ default: '' })
  streakPeriodStartDate?: string;

  @Prop({ default: '' })
  currentPeriodStartDate?: string;

  @Prop({ default: '' })
  currentPeriodEndDate?: string;

  @Prop({ default: '' })
  streakPeriodEndDate?: string;

  @Prop({ default: '' })
  lastEvaluatedPeriodEnd?: string;

  @Prop({ default: 0 })
  numberOfDoneThisPeriod?: number;

  @Prop({ required: true, enum: HabitFrequencyEnum })
  type: HabitFrequencyEnum;

  @Prop({
    required: function (this: Habit) {
      return this.type === HabitFrequencyEnum.CUSTOM;
    },
  })
  period?: HabitFrequencyPeriodEnum;

  @Prop({
    required: function (this: Habit) {
      return this.type === HabitFrequencyEnum.CUSTOM;
    },
    min: 1,
  })
  targetCount?: number;
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
