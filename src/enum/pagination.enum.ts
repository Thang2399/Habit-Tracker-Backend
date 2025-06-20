import { HabitFrequencyEnum, HabitFrequencyPeriodEnum } from './habit.enum';
import { NotificationTemplateEnum } from './notification.enum';

export enum PaginationOrderByValues {
  ASC = 'asc', // earliest => latest
  DESC = 'desc',
}

export enum PaginationDefaultEnum {
  Current_Page = 1,
  Page_Size = 10,
  Search = '',
  OrderBy = PaginationOrderByValues.DESC,
  OrderType = 'updatedAt',
  HabitType = HabitFrequencyEnum.DAILY,
  HabitPeriod = HabitFrequencyPeriodEnum.WEEK,
  NotificationTemplateType = NotificationTemplateEnum.DAILY_REMINDER,
}
