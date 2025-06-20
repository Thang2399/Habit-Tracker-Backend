import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationTemplateEnum } from '../enum/notification.enum';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  habitId: string;

  @Prop({ required: true })
  notificationTemplateId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({
    required: true,
    enum: NotificationTemplateEnum,
    default: NotificationTemplateEnum.DAILY_REMINDER,
  })
  notificationTemplateType: string;

  @Prop()
  sendDate?: Date;

  @Prop()
  sendAt?: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
