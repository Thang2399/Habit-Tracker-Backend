import { Prop } from '@nestjs/mongoose';

export class AbstractDto {
  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}
