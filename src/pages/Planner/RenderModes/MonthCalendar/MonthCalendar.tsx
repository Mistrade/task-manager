import React, { FC, useMemo, useRef } from 'react';
import { MonthCalendarProps } from '../../planner.types';
import {
  CalendarDateListContainer,
  CalendarDesktopContainer,
} from '../../Planner.styled';
import { WeeKCalendar } from '../WeekCalendar/WeekCalendar';
import { DateScopeHelper } from '../../../../common/calendarSupport/scopes';
import dayjs from 'dayjs';
import { FindEventFilter } from '../FindEventFilter/FindEventFilter';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { useEventStorage } from '../../../../hooks/useEventStorage';
import { hideScrollBar } from '../../../../components/Switcher/Switcher';

export const MonthCalendar: FC<MonthCalendarProps> = ({
  monthItem,
  current,
  onAddTask,
  onSelectTask,
  onChangeCurrent,
  renderTaskCount,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scope = useMemo(() => {
    const v = new DateScopeHelper({
      useOtherDays: true,
    }).getDateScopeForTaskScheme(
      new Date(monthItem.year, monthItem.monthOfYear),
      'month'
    );

    return {
      fromDate: dayjs(v.fromDate).toDate(),
      toDate: dayjs(v.toDate).toDate(),
    };
  }, [monthItem.monthOfYear]);

  const { filters, SwitcherBadges, TaskStorage, handlers, isFetching } =
    useEventStorage({
      layout: current.layout,
      scope: {
        start: scope.fromDate,
        end: scope.toDate,
      },
    });

  return (
    <FlexBlock width={'100%'} direction={'column'} mt={4} mb={4}>
      <FlexBlock width={'100%'}>
        <FindEventFilter
          values={filters}
          onChangeHandlers={handlers}
          statusBadges={SwitcherBadges}
          isLoading={isFetching}
        />
      </FlexBlock>
      <FlexBlock
        overflowX={'hidden'}
        overflowY={'auto'}
        ml={-8}
        pl={8}
        mr={-8}
        pr={8}
        position={'relative'}
        additionalCss={hideScrollBar}
      >
        <CalendarDesktopContainer ref={containerRef}>
          <CalendarDateListContainer rowsCount={6}>
            {monthItem.weeks.map((week, index) => (
              <WeeKCalendar
                animationIndex={index + 1}
                taskStorage={TaskStorage || {}}
                key={`monthCalendarWeek_year_${monthItem.year}_month_${monthItem.monthOfYear}_week_${week.weekOfYear}`}
                weekItem={week}
                current={current}
                onChangeCurrent={onChangeCurrent}
                onSelectTask={onSelectTask}
                renderTaskCount={renderTaskCount}
                onAddTask={onAddTask}
              />
            ))}
          </CalendarDateListContainer>
        </CalendarDesktopContainer>
      </FlexBlock>
    </FlexBlock>
  );
};
