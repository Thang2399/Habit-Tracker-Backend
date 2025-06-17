import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import {
  Get,
  Controller,
  Post,
  UseGuards,
  Body,
  Res,
  Req,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '../../guard/auth/auth.guard';
import { HabitService } from './habit.service';
import { CreateHabitDto } from '../../dto/habit/create-habit.dto';
import { Request, Response } from 'express';
import { IUser } from '../../interface/user';
import { CurrentUser } from '../../decorator/user.decorator';
import { UpdateHabitDto } from '../../dto/habit/update-habit.dto';

@ApiBearerAuth()
@ApiTags('Habit')
@UseGuards(AuthGuard)
@Controller('habit')
export class HabitController {
  constructor(private habitService: HabitService) {}

  @ApiOperation({ description: 'Create a new Habit' })
  @ApiBody({ type: CreateHabitDto })
  @Post('/create')
  async createNewHabit(
    @CurrentUser() user: IUser,
    @Body() dto: CreateHabitDto,
    @Res() res: Response,
  ) {
    return this.habitService.createNewHabit(user, dto, res);
  }

  @ApiOperation({ description: 'Update a Habit' })
  @ApiParam({ name: 'id', description: 'habit ID', type: String })
  @ApiBody({ type: UpdateHabitDto })
  @Put('/update/:id')
  async updateHabit(
    @Param('id') id: string,
    @Body() dto: UpdateHabitDto,
    @Res() res: Response,
  ) {
    return this.habitService.updateHabit(id, dto, res);
  }

  @ApiOperation({ description: 'Get detail a Habit' })
  @ApiParam({ name: 'id', description: 'habit ID', type: String })
  @Get('/:id')
  async getDetailHabit(@Param('id') id: string, @Res() res: Response) {
    return this.habitService.getDetailHabit(id, res);
  }

  @ApiOperation({ description: 'Delete a Habit' })
  @ApiParam({ name: 'id', description: 'habit ID', type: String })
  @Delete('/:id')
  async deleteHabit(@Param('id') id: string, @Res() res: Response) {
    return this.habitService.deleteHabit(id, res);
  }
}
