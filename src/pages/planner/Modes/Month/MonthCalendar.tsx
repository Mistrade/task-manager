import { useEventStorageQueryArgs } from '@hooks/useEventStorageQueryArgs';
import { setPlannerLayout } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import {
  plannerSelectLayout,
  plannerSelectMonthConfig,
} from '@selectors/planner';
import React, { FC, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';

import { MonthList } from '@src/common/constants/constants';
import { PLANNER_LAYOUTS } from '@src/common/constants/enums';
import { disableReRender } from '@src/common/utils/react-utils';

import { WeeKCalendar } from '@planner/Modes/Week/WeekCalendar';
import { CalendarDateListContainer } from '@planner/styled';
import { MonthCalendarProps } from '@planner/types';

import { useGetEventsStorageQuery } from '@api/planning-api';

export const MonthCalendar: FC<MonthCalendarProps> = React.memo(
  ({ renderTaskCount }) => {
    const config = useAppSelector(plannerSelectMonthConfig);
    const args = useEventStorageQueryArgs();

    const { data: eventStorage } = useGetEventsStorageQuery(args);

    const layout = useAppSelector(plannerSelectLayout);
    const dispatch = useAppDispatch();
    useLayoutEffect(() => {
      if (layout !== PLANNER_LAYOUTS.MONTH) {
        dispatch(setPlannerLayout(PLANNER_LAYOUTS.MONTH));
      }
    }, []);

    return (
      <>
        <Helmet
          title={`События ${MonthList[config.monthOfYear]} ${config.year}г.`}
        />
        <CalendarDateListContainer rowsCount={6}>
          {config.weeks.map((week) => (
            <WeeKCalendar
              taskStorage={eventStorage?.data || {}}
              key={`monthCalendarWeek_year_${config.year}_month_${config.monthOfYear}_week_${week.weekOfYear}`}
              config={week}
              renderTaskCount={renderTaskCount}
            />
          ))}
        </CalendarDateListContainer>
      </>
    );
  },
  disableReRender
);
