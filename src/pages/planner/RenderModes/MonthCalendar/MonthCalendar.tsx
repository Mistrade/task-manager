import React, { FC, useCallback, useContext, useMemo } from 'react';
import { MonthCalendarProps } from '@planner/planner.types';
import { CalendarDateListContainer } from '@planner/Planner.styled';
import { WeeKCalendar } from '@planner/RenderModes/WeekCalendar/WeekCalendar';
import { DateScopeHelper } from '@src/common/calendarSupport/scopes';
import dayjs from 'dayjs';
import { FindEventFilter } from '@planner/RenderModes/FindEventFilter/FindEventFilter';
import { useEventStorage } from '@hooks/useEventStorage';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { PLANNER_LAYOUTS } from '@src/common/constants';
import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';
import { PlannerContext } from '@src/Context/planner.context';

export const MonthCalendar: FC<MonthCalendarProps> = ({
  monthItem,
  renderTaskCount,
}) => {
  const {
    currentDate,
    currentLayout,
    methods: { updateCurrentLayoutAndNavigate },
  } = useContext(PlannerContext);

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
      layout: currentLayout,
      scope: {
        start: scope.fromDate,
        end: scope.toDate,
      },
    });

  const breadCrumbsArr = useMemo(() => {
    return [
      {
        title: `${currentDate.month.getFullYear()}г.`,
        value: PLANNER_LAYOUTS.YEAR,
      },
    ];
  }, [monthItem.monthOfYear]);

  const breadCrumbsSelectHandler = useCallback(
    (data: PLANNER_LAYOUTS) => {
      updateCurrentLayoutAndNavigate(data, currentDate.month);
    },
    [monthItem.monthOfYear]
  );

  return (
    <ScrollVerticalView
      staticContent={
        <FlexBlock direction={'column'}>
          <BreadCrumbs
            data={breadCrumbsArr}
            onClick={breadCrumbsSelectHandler}
          />
          <FindEventFilter
            values={filters}
            onChangeHandlers={handlers}
            statusBadges={SwitcherBadges}
            isLoading={isFetching}
          />
        </FlexBlock>
      }
      placementStatic={'top'}
      renderPattern={'top-bottom'}
    >
      <CalendarDateListContainer rowsCount={6}>
        {monthItem.weeks.map((week) => (
          <WeeKCalendar
            taskStorage={TaskStorage || {}}
            key={`monthCalendarWeek_year_${monthItem.year}_month_${monthItem.monthOfYear}_week_${week.weekOfYear}`}
            weekItem={week}
            renderTaskCount={renderTaskCount}
          />
        ))}
      </CalendarDateListContainer>
    </ScrollVerticalView>
  );
};
