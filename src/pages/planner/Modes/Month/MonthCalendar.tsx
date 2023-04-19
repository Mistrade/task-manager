import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import {
  plannerSelectFilters,
  plannerSelectMonthConfig,
} from '@selectors/planner';
import React, { FC, useMemo } from 'react';
import { Helmet } from 'react-helmet';

import { MonthList } from '@src/common/constants/constants';
import { UTC_OFFSET } from '@src/common/constants/defaultConstants';
import { disableReRender } from '@src/common/utils/react-utils';

import { WeeKCalendar } from '@planner/Modes/Week/WeekCalendar';
import { CalendarDateListContainer } from '@planner/styled';
import { MonthCalendarProps } from '@planner/types';

import { useGetEventsStorageQuery } from '@api/planning-api';
import { GetEventsFiltersRequestProps } from '@api/planning-api/types/event-info.types';

export const MonthCalendar: FC<MonthCalendarProps> = React.memo(
  ({ renderTaskCount }) => {
    const config = useAppSelector(plannerSelectMonthConfig);
    const filters = useAppSelector(plannerSelectFilters);

    const queryArg: GetEventsFiltersRequestProps = useMemo(() => {
      return {
        utcOffset: UTC_OFFSET,
        fromDate: plannerDateToDate(config.scope.startDate).toString(),
        toDate: plannerDateToDate(config.scope.endDate).toString(),
        taskStatus: filters.taskStatus,
        onlyFavorites: false,
        title: filters.title,
        findOnlyInSelectedGroups: true,
        priority: filters.priority,
      };
    }, [filters, config.scope]);

    const { data: eventStorage } = useGetEventsStorageQuery(queryArg);

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
