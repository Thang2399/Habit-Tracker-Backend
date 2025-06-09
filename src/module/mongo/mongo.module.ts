import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGOOSE_CONNECTION || '"mongodb://localhost:27017',
    ),
  ],
  providers: [],
})
export class MongoModule {}
