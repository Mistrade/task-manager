import { useEventStorageQueryArgs } from '@hooks/useEventStorageQueryArgs';
import React, { FC, memo } from 'react';

import { WeekCalendarProps } from '@planner/types';

import { useGetEventsStorageQuery } from '@api/planning-api';

import { WeeKCalendar } from './WeekCalendar';


export interface WeekCalendarControllerProps
  extends Omit<WeekCalendarProps, 'taskStorage'> {}

export const WeekCalendarController: FC<WeekCalendarControllerProps> = memo(
  ({ config }) => {
    const queryArg = useEventStorageQueryArgs();
    const { data: eventStorage } = useGetEventsStorageQuery(queryArg);

    return (
      <WeeKCalendar taskStorage={eventStorage?.data || {}} config={config} />
    );
  },
  (prev, next) => prev.config.weekOfYear === next.config.weekOfYear
);