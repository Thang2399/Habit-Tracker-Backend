import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards, Post, Body, Res } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth/auth.guard';
import { HabitLogService } from './habit-log.service';
import { CreateHabitLogDto } from '../../dto/habit-log/create-habit-log.dto';
import { CurrentUser } from '../../decorator/user.decorator';
import { Response } from 'express';
import { IUser } from '../../interface/user';

@ApiBearerAuth()
@ApiTags('HabitLog')
@UseGuards(AuthGuard)
@Controller('habit-log')
export class HabitLogController {
  constructor(private habitLogService: HabitLogService) {}

  @ApiOperation({ description: 'Create a Habit log' })
  @ApiBody({ type: CreateHabitLogDto })
  @Post('/create')
  async createHabitLog(
    @CurrentUser() user: IUser,
    @Body() dto: CreateHabitLogDto,
    @Res() res: Response,
  ) {
    return this.habitLogService.createHabitLog(user, dto, res);
  }
}
