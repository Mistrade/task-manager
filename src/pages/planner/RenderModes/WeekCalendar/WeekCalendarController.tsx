import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { EventsStorage, WeekCalendarProps } from '@planner/planner.types';
import { SmartEventFilters } from '@planner/RenderModes/FindEventFilter/SmartEventFilters';
import { WeekBreadCrumbs } from '@planner/RenderModes/WeekCalendar/SupportComponents/WeekBreadCrumbs';
import React, { FC, memo, useCallback, useState } from 'react';
import { WeeKCalendar } from './WeekCalendar';

export interface WeekCalendarControllerProps
  extends Omit<WeekCalendarProps, 'taskStorage'> {}

export const WeekCalendarController: FC<WeekCalendarControllerProps> = memo(
  ({ config }) => {
    const [eventStorage, setEventStorage] = useState<EventsStorage>({});

    const handleChangeStorage = useCallback((storage: EventsStorage) => {
      setEventStorage(storage);
    }, []);

    return (
      <ScrollVerticalView
        staticContent={
          <FlexBlock direction={'column'}>
            <WeekBreadCrumbs />
            <SmartEventFilters updateStorage={handleChangeStorage} />
          </FlexBlock>
        }
        placementStatic={'top'}
        renderPattern={'top-bottom'}
      >
        <WeeKCalendar taskStorage={eventStorage} config={config} />
      </ScrollVerticalView>
    );
  },
  (prev, next) => prev.config.weekOfYear === next.config.weekOfYear
);
