import { useEventStorageQueryArgs } from '@hooks/useEventStorageQueryArgs';
import { setPlannerLayout } from '@planner-reducer/index';
import { plannerDateToDate } from '@planner-reducer/utils';
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

import { Loader } from '@components/Loaders/Loader';

import { CalendarDateListContainer } from '@planner/styled';
import { MonthCalendarProps } from '@planner/types';

import { useGetTotalSampleQuery } from '@api/finance-api';
import { useGetEventsStorageQuery } from '@api/planning-api';

import { AccordionWeekItem } from '../Week/AccordionWeekItem';


export const MonthCalendar: FC<MonthCalendarProps> = React.memo(
  ({ renderTaskCount }) => {
    const config = useAppSelector(plannerSelectMonthConfig);
    const args = useEventStorageQueryArgs();

    const { data: eventStorage, isLoading } = useGetEventsStorageQuery(args);

    const layout = useAppSelector(plannerSelectLayout);
    const dispatch = useAppDispatch();
    useLayoutEffect(() => {
      if (layout !== PLANNER_LAYOUTS.MONTH) {
        dispatch(setPlannerLayout(PLANNER_LAYOUTS.MONTH));
      }
    }, []);
  
    const {currentData, isLoading: isTotalSampleLoading} = useGetTotalSampleQuery({
      fromDate: plannerDateToDate(config.scope.startDate).toString(),
      toDate: plannerDateToDate(config.scope.endDate).toString()
    })

    return (
      <>
        <Helmet
          title={`События ${MonthList[config.monthOfYear]} ${config.year}г.`}
        />
        <Loader isActive={isLoading} title={'Загрузка данных...'}>
          <CalendarDateListContainer rowsCount={6}>
            {config.weeks.map((week, index) => (
              <AccordionWeekItem
                byEventsSample={currentData?.data}
                renderMode={'base'}
                taskStorage={eventStorage?.data || {}}
                key={index}
                config={week}
                renderTaskCount={renderTaskCount}
              />
            ))}
          </CalendarDateListContainer>
        </Loader>
      </>
    );
  },
  disableReRender
);