import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate } from '@selectors/planner';
import { disableReRender } from '@src/common/utils/react-utils';
import { FC, memo } from 'react';
import { DayTaskList } from './TaskList/DayTaskList';

export const DayCalendar: FC = memo(() => {
  const date = useAppSelector(plannerSelectDate);

  return <DayTaskList day={plannerDateToDate(date)} />;
}, disableReRender);
