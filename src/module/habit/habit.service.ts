import {
  Body,
  Injectable,
  Req,
  Res,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Habit, HabitDocument } from '../../schema/habit.schema';
import { Model } from 'mongoose';
import { CreateHabitDto } from '../../dto/create-habit.dto';
import { Response } from 'express';
import { IUser } from '../../interface/user';
import { UpdateHabitDto } from '../../dto/update-habit.dto';

@Injectable()
export class HabitService {
  constructor(
    @InjectModel(Habit.name) private habitModel: Model<HabitDocument>,
  ) {}

  async createNewHabit(user: IUser, dto: CreateHabitDto, res: Response) {
    const body = {
      ...dto,
      userId: user.userId,
    };
    const newHabit = new this.habitModel(body);
    await newHabit.save();
    const habitRes = newHabit.toObject();
    return res.json(habitRes);
  }

  async getDetailHabit(id: string, res: Response) {
    const specificHabit = await this.habitModel.findById(id);
    if (!specificHabit) {
      throw new NotFoundException('No Habits found with id ' + id);
    } else {
      const habitRes = specificHabit.toObject();
      return res.json(habitRes);
    }
  }

  async updateHabit(id: string, dto: UpdateHabitDto, res: Response) {
    const specificHabit = await this.habitModel.findById(id);
    if (!specificHabit) {
      throw new NotFoundException('No Habits found with id ' + id);
    } else {
      await this.habitModel.findByIdAndUpdate(id, dto);
      return res.json({
        statusCode: HttpStatus.CREATED,
      });
    }
  }

  async deleteHabit(id: string, res: Response) {
    const specificHabit = await this.habitModel.findById(id);
    if (!specificHabit) {
      throw new NotFoundException('No Habits found with id ' + id);
    } else {
      await this.habitModel.findByIdAndDelete(id);
      return res.json({ statusCode: HttpStatus.ACCEPTED });
    }
  }
}
