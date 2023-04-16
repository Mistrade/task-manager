import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectMonthConfig } from '@selectors/planner';
import React, { FC, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';

import { MonthList } from '@src/common/constants';
import { disableReRender } from '@src/common/utils/react-utils';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { Loader } from '@components/Loaders/Loader';

import { Interceptor } from '@planner/Interceptor/Interceptor';
import { CalendarDateListContainer } from '@planner/Planner.styled';
import { SmartEventFilters } from '@planner/RenderModes/FindEventFilter/SmartEventFilters';
import { WeeKCalendar } from '@planner/RenderModes/WeekCalendar/WeekCalendar';
import { EventsStorage, MonthCalendarProps } from '@planner/planner.types';

export const MonthCalendar: FC<MonthCalendarProps> = React.memo(
  ({ renderTaskCount }) => {
    const config = useAppSelector(plannerSelectMonthConfig);
    const [isInitialize, setIsInitialize] = useState(false);
    const [eventStorage, setEventStorage] = useState({});

    const updateHandle = useCallback((storage: EventsStorage) => {
      setEventStorage(storage);
      setIsInitialize(true);
    }, []);

    return (
      <>
        <Helmet
          title={`События ${MonthList[config.monthOfYear]} ${config.year}г.`}
        />
        <ScrollVerticalView
          staticContent={
            <FlexBlock direction={'column'}>
              <SmartEventFilters updateStorage={updateHandle} />
            </FlexBlock>
          }
          placementStatic={'top'}
          renderPattern={'top-bottom'}
        >
          <Interceptor
            shouldRenderChildren={isInitialize}
            fallBack={<Loader isActive={true} title={'Загрузка данных...'} />}
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
          </Interceptor>
        </ScrollVerticalView>
      </>
    );
  },
  disableReRender
);
