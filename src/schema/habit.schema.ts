import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HabitFrequencyEnum,
  HabitFrequencyPeriodEnum,
} from '../enum/habit.enum';
import { AbstractSchema } from './abstract.schema';

export type HabitDocument = HydratedDocument<Habit>;

@Schema()
export class Habit extends AbstractSchema {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: 0 })
  streak?: number;

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
