import { HabitFrequencyPeriodEnum } from '../../enum/habit.enum';

export const getCurrentDateTimeIsoString = () => {
  return new Date().toISOString();
};

export const getToday = () => {
  return new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
};

export const getTodayDateRange = () => {
  const now = new Date(); // Always in UTC
  const start = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );
  const end = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );
  return { start, end };
};

export function getLastDayOfWeek(date: Date = new Date()): Date {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysUntilSunday = 7 - dayOfWeek; // If today is Wed (3) → +4 days

  const lastDay = new Date(date);
  lastDay.setDate(date.getDate() + (daysUntilSunday % 7));
  lastDay.setHours(23, 59, 59, 999); // optional: end of day
  return lastDay;
}

export function getLastDayOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export const getLastDay = (period: HabitFrequencyPeriodEnum) => {
  if (period === HabitFrequencyPeriodEnum.WEEK) {
    return getLastDayOfWeek();
  } else if (period === HabitFrequencyPeriodEnum.MONTH) {
    return getLastDayOfMonth();
  }
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months: 0–11
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getPeriodWindow(
  period: HabitFrequencyPeriodEnum,
  date: Date = new Date(),
): { startPeriodWindow: string; endPeriodWindow: string } {
  if (period === HabitFrequencyPeriodEnum.WEEK) {
    // Get Monday of current week
    const start = new Date(date);
    const day = start.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const diffToMonday = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diffToMonday);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Sunday
    end.setHours(23, 59, 59, 999);

    return {
      startPeriodWindow: formatDate(start),
      endPeriodWindow: formatDate(end),
    };
  }

  if (period === HabitFrequencyPeriodEnum.MONTH) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);

    return {
      startPeriodWindow: formatDate(start),
      endPeriodWindow: formatDate(end),
    };
  }

  throw new Error('Unsupported period type');
}