import { Controller, Get, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('Health check')
@Controller('health')
export class HealthController {
  @ApiOperation({
    description: 'Check health of sever',
  })
  @Get()
  getHealthCheck(@Res() res: Response) {
    return res.status(200).json({
      message: 'Hello world! The Habit Tracker Service is still alive!',
    });
  }
}
