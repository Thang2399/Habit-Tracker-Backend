import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiConfigServices } from './config/api/api-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ApiConfigServices);

  const port = configService.getPort();
  const version = configService.getVersion();

  const config = new DocumentBuilder()
    .setTitle('Habit Tracker APIs')
    .setDescription('The Habit Tracker APIs description')
    .setVersion(version)
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, documentFactory);

  await app.listen(port ?? 8800);
}

bootstrap();
