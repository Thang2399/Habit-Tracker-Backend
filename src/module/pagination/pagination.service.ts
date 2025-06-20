import { Model } from 'mongoose';
import { PaginationDefaultEnum } from '../../enum/pagination.enum';
import { NotificationTemplateEnum } from '../../enum/notification.enum';
import { Injectable } from '@nestjs/common';
import { HabitFrequencyEnum } from '../../enum/habit.enum';

@Injectable()
export class PaginationService {
  constructor() {}

  async getPaginationData(model: Model<any>, query: any, userId?: string) {
    const {
      page = PaginationDefaultEnum.Current_Page,
      limit = PaginationDefaultEnum.Page_Size,
      search = PaginationDefaultEnum.Search,
      orderBy = PaginationDefaultEnum.OrderBy,
      orderType = PaginationDefaultEnum.OrderType,
      habitType = '',
      habitPeriod = '',
      notificationTemplateType = '',
      habitId = '',
    } = query;

    const skip = (page - 1) * limit;

    const queryOptions: any = {};

    if (userId) {
      queryOptions.userId = userId;
    }

    if (search) {
      queryOptions.title = { $regex: new RegExp(search, 'i') };
    }

    if (habitType) {
      queryOptions.type = habitType;
    }
    if (habitPeriod && habitType === HabitFrequencyEnum.CUSTOM) {
      queryOptions.period = habitPeriod;
    }

    if (habitId) {
      queryOptions.habitId = habitId;
    }
    if (notificationTemplateType) {
      queryOptions.notificationTemplateType = notificationTemplateType;
    }

    const sortOptions: any = {};

    sortOptions[`${orderType}`] = orderBy || PaginationDefaultEnum.OrderBy;

    console.log('queryOptions', queryOptions);

    const result = await model
      .find(queryOptions)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalCount = (await model.countDocuments(queryOptions)) || 0;
    const totalPages = Math.ceil(totalCount / limit) || 0;

    return {
      data: result,
      search,
      page,
      limit,
      totalCount,
      totalPages,
    };
  }
}
