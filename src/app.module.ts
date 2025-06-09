import { Module } from '@nestjs/common';
import { ApiConfigServices } from './config/api/api-config.service';
import { ApiConfigModule } from './config/api/api-config.module';
import { HealthModule } from './module/health/health.module';
import { MongoModule } from './module/mongo/mongo.module';

@Module({
  imports: [ApiConfigModule, HealthModule, MongoModule],
  controllers: [],
  providers: [ApiConfigServices],
})
export class AppModule {}
