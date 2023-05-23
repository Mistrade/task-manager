import { setPlannerLayout } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import {
  plannerSelectLayout,
  plannerSelectWeekConfig,
} from '@selectors/planner';
import { FC, memo, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';

import { PLANNER_LAYOUTS } from '@src/common/constants/enums';

import { RenderTaskCountType } from '../../types';
import { WeekCalendarController } from './components';

export const WeekLayout: FC<{ renderTaskCount?: RenderTaskCountType }> = memo(
  ({ renderTaskCount }) => {
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
        <Helmet
          title={`События ${config.weekOfYear} недели ${config.year}г.`}
        />
        <WeekCalendarController
          renderMode={'scrollable'}
          config={config}
          renderTaskCount={renderTaskCount}
        />
      </>
    );
  }
);
