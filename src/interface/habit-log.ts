export interface IHabitLog {
  habitId: string;
  userId: string;
  isCompleted: boolean;
  mood?: string;
}