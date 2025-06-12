import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type LogDocument = HydratedDocument<Log>;

export class Log extends AbstractSchema {
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

export const LogSchema = SchemaFactory.createForClass(Log);
