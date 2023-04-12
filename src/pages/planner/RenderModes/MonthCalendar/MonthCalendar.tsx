import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { CalendarDateListContainer } from '@planner/Planner.styled';
import { EventsStorage, MonthCalendarProps } from '@planner/planner.types';
import { SmartEventFilters } from '@planner/RenderModes/FindEventFilter/SmartEventFilters';
import { MonthBreadCrumbs } from '@planner/RenderModes/MonthCalendar/SupportComponents/MonthBreadCrumbs';
import { WeeKCalendar } from '@planner/RenderModes/WeekCalendar/WeekCalendar';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectMonthConfig } from '@selectors/planner';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { FC, useCallback, useState } from 'react';

export const MonthCalendar: FC<MonthCalendarProps> = React.memo(
  ({ renderTaskCount }) => {
    const config = useAppSelector(plannerSelectMonthConfig);
    const [eventStorage, setEventStorage] = useState(() => ({}));

    const updateHandle = useCallback((storage: EventsStorage) => {
      setEventStorage(storage);
    }, []);

    return (
      <ScrollVerticalView
        staticContent={
          <FlexBlock direction={'column'}>
            <MonthBreadCrumbs />
            <SmartEventFilters updateStorage={updateHandle} />
          </FlexBlock>
        }
        placementStatic={'top'}
        renderPattern={'top-bottom'}
      >
        <CalendarDateListContainer rowsCount={6}>
          {config.weeks.map((week) => (
            <WeeKCalendar
              taskStorage={eventStorage}
              key={`monthCalendarWeek_year_${config.year}_month_${config.monthOfYear}_week_${week.weekOfYear}`}
              config={week}
              renderTaskCount={renderTaskCount}
            />
          ))}
        </CalendarDateListContainer>
      </ScrollVerticalView>
    );
  },
  disableReRender
);
