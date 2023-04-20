import { setPlannerLayout } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import {
  plannerSelectLayout,
  plannerSelectWeekConfig,
} from '@selectors/planner';
import { memo, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';

import { PLANNER_LAYOUTS } from '@src/common/constants/enums';

import { WeekCalendarController } from '@planner/Modes/Week/WeekCalendarController';

export const WeekLayout = memo(() => {
  const config = useAppSelector(plannerSelectWeekConfig);
  const layout = useAppSelector(plannerSelectLayout);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (layout !== PLANNER_LAYOUTS.WEEK) {
      dispatch(setPlannerLayout(PLANNER_LAYOUTS.WEEK));
    }
  }, []);

  return (
    <>
      <Helmet title={`События ${config.weekOfYear} недели ${config.year}г.`} />
      <WeekCalendarController config={config} />
    </>
  );
});
