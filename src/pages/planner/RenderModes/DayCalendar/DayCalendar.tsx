import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate } from '@selectors/planner';
import { FC, memo } from 'react';
import { Helmet } from 'react-helmet';

import { DateHelper } from '@src/common/calendarSupport/dateHelper';
import { disableReRender } from '@src/common/utils/react-utils';

import { DayTaskList } from './TaskList/DayTaskList';


export const DayCalendar: FC = memo(() => {
  const date = useAppSelector(plannerSelectDate);

  return (
    <>
      <Helmet
        title={`События ${DateHelper.getHumanizeDateValue(
          plannerDateToDate(date),
          {
            withTime: false,
            withYear: true,
            monthPattern: 'short',
            yearPattern: 'short',
          }
        )}`}
      />
      <DayTaskList />
    </>
  );
}, disableReRender);