import React, { FC, useContext, useMemo } from 'react';
import { MonthCalendarProps } from '../../planner.types';
import { CalendarDateListContainer } from '../../Planner.styled';
import { WeeKCalendar } from '../WeekCalendar/WeekCalendar';
import { DateScopeHelper } from '../../../../common/calendarSupport/scopes';
import dayjs from 'dayjs';
import { FindEventFilter } from '../FindEventFilter/FindEventFilter';
import { useEventStorage } from '../../../../hooks/useEventStorage';
import { ScrollVerticalView } from '../../../../components/LayoutComponents/ScrollView/ScrollVerticalView';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { PLANNER_LAYOUTS } from '../../../../common/constants';
import { BreadCrumbs } from '../../../../components/BreadCrumbs/BreadCrumbs';
import { PlannerContext } from '../../../../Context/planner.context';

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

  return (
    <ScrollVerticalView
      containerProps={{ pt: 4, pb: 4, mt: 6 }}
      staticContent={
        <FlexBlock direction={'column'}>
          <BreadCrumbs
            data={[
              {
                title: `${currentDate.month.getFullYear()}г.`,
                value: PLANNER_LAYOUTS.YEAR,
              },
            ]}
            onClick={(data) => {
              updateCurrentLayoutAndNavigate(data, currentDate.month);
            }}
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
        {monthItem.weeks.map((week, index) => (
          <WeeKCalendar
            animationIndex={index + 1}
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
