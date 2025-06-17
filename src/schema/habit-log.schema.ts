import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HabitLogDocument = HydratedDocument<HabitLog>;

@Schema({ timestamps: true })
export class HabitLog {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  habitId: string;

  @Prop({ required: true, default: false })
  isCompleted?: boolean;

  @Prop({ default: 0 })
  numberOfDoneThisPeriod?: number;

  @Prop({ default: '' })
  mood?: string;
}

export const HabitLogSchema = SchemaFactory.createForClass(HabitLog);
