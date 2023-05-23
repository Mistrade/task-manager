import { useEventStorageQueryArgs } from '@hooks/useEventStorageQueryArgs';
import React, { FC, memo } from 'react';

import { FlexBlock } from '@components/LayoutComponents';
import { Loader } from '@components/Loaders/Loader';

import { useGetEventsStorageQuery } from '@api/planning-api';

import { WeekItemProps } from '../../../types';
import { WeekItem } from './WeekItem';
import { FullHeightWeekContainer } from './styled';

export interface WeekCalendarControllerProps
  extends Omit<WeekItemProps, 'taskStorage'> {}

export const WeekCalendarController: FC<WeekCalendarControllerProps> = memo(
  ({ config }) => {
    const queryArg = useEventStorageQueryArgs();
    const { data: eventStorage, isLoading } =
      useGetEventsStorageQuery(queryArg);

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
