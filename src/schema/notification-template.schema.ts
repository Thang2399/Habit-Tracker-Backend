import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationTemplateEnum } from '../enum/notification.enum';

export type NotificationTemplateDocument =
  HydratedDocument<NotificationTemplate>;

@Schema({ timestamps: true })
export class NotificationTemplate {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({
    required: true,
    enum: NotificationTemplateEnum,
    default: NotificationTemplateEnum.DAILY_REMINDER,
  })
  notificationTemplateType: string;
}

export const NotificationTemplateSchema =
  SchemaFactory.createForClass(NotificationTemplate);
