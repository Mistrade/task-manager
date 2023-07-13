import { setPlannerLayout } from '@planner-reducer/index';
import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate, plannerSelectLayout } from '@selectors/planner';
import { FC, memo, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';

import { DateHelper } from '@src/common/calendarSupport/dateHelper';
import { PLANNER_LAYOUTS } from '@src/common/constants/enums';
import { disableReRender } from '@src/common/utils/react-utils';

import { DayTaskList } from './TaskList/DayTaskList';

export const DayCalendar: FC = memo(() => {
  const date = useAppSelector(plannerSelectDate);
  const layout = useAppSelector(plannerSelectLayout);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (layout !== PLANNER_LAYOUTS.DAY) {
      dispatch(setPlannerLayout(PLANNER_LAYOUTS.DAY));
    }
  }, []);

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
