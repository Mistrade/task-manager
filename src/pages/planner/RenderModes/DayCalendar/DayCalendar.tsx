import { FC } from 'react';
import { DayCalendarProps } from '@planner/planner.types';
import { DayTaskList } from './TaskList/DayTaskList';

export const DayCalendar: FC<DayCalendarProps> = ({
  currentDate,
  onSelectTask,
}) => {
  return <DayTaskList day={currentDate} onSelectTask={onSelectTask} />;
};
