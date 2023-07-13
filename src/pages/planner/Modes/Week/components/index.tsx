import { useEventStorageQueryArgs } from '@hooks/useEventStorageQueryArgs';
import { plannerDateToDate } from '@planner-reducer/utils';
import React, { FC, memo } from 'react';

import { FlexBlock } from '@components/LayoutComponents';
import { Loader } from '@components/Loaders/Loader';

import { useGetTotalSampleQuery } from '@api/finance-api';
import { useGetEventsStorageQuery } from '@api/planning-api';

import { WeekItemProps } from '../../../types';
import { WeekItem } from './WeekItem';
import { FullHeightWeekContainer } from './styled';


export interface WeekCalendarControllerProps
  extends Omit<WeekItemProps, 'taskStorage' | 'byEventsSample'> {}

export const WeekCalendarController: FC<WeekCalendarControllerProps> = memo(
  ({ config }) => {
    const queryArg = useEventStorageQueryArgs();
    const { data: eventStorage, isLoading } =
      useGetEventsStorageQuery(queryArg);
  
    const {currentData, isLoading: isTotalSampleLoading} = useGetTotalSampleQuery({
      fromDate: plannerDateToDate(config.scope.startDate).toString(),
      toDate: plannerDateToDate(config.scope.endDate).toString()
    })

    return (
      <Loader isActive={isLoading} title={'Загрузка данных...'}>
        <FlexBlock
          height={'100%'}
          overflow={'hidden'}
          direction={'column'}
          pb={24}
        >
          <FullHeightWeekContainer>
            <WeekItem
              byEventsSample={currentData?.data}
              taskStorage={eventStorage?.data || {}}
              config={config}
              renderTaskCount={'all'}
              renderMode={'scrollable'}
            />
          </FullHeightWeekContainer>
        </FlexBlock>
      </Loader>
    );
  },
  (prev, next) => prev.config.weekOfYear === next.config.weekOfYear
);