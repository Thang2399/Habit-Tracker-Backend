import { Prop } from '@nestjs/mongoose';
import { getCurrentDateTimeIsoString } from '../common/utils';

export class AbstractSchema {
  @Prop({ default: getCurrentDateTimeIsoString() }) // Set the default value to the current ISO date and time
  createdAt?: string;

  @Prop({ default: getCurrentDateTimeIsoString() })
  updatedAt?: string;
}
