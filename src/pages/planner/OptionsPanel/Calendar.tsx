import { plannerDateToDate } from '@planner-reducer/utils';
import { PlannerMonthMode } from '@planner/planner.types';
import { SmallCalendarMonthTitle } from '@planner/SmallMotnCalendar/SmallCalendarMonthTitle';
import { SmallMonth } from '@planner/SmallMotnCalendar/SmallMonth';
import { useAppSelector } from '@redux/hooks/hooks';
import {
  plannerSelectDate,
  plannerSelectPanelConfig,
} from '@selectors/planner';
import React, { FC, useMemo } from 'react';

export const OptionPanelCalendar: FC = () => {
  const currentDate = useAppSelector(plannerSelectDate);
  const config = useAppSelector(plannerSelectPanelConfig);

  const MonthCurrent: PlannerMonthMode = useMemo(
    () => ({
      layout: 'month',
      month: config.monthOfYear,
      year: config.year,
    }),
    []
  );

  // const pour: PourDatesProps | undefined = useMemo(() => {
  //   if (layout === PLANNER_LAYOUTS.WEEK) {
  //     return {
  //       type: 'week',
  //       date: plannerDateToDate(currentDate),
  //     };
  //   }
  //
  //   return undefined;
  // }, [layout, currentDate]);

  return (
    <SmallMonth
      monthItem={config}
      title={
        <SmallCalendarMonthTitle
          monthItem={config}
          onClick={
            (data) => {}
            // setPlannerDate({
            //   layout,
            //   date: da
            // })
          }
        />
      }
      current={MonthCurrent}
      value={plannerDateToDate(currentDate)}
      // onSelectDate={(date) =>
      //   // updateCurrentLayoutAndNavigate(
      //   //   PLANNER_LAYOUTS.DAY,
      //   //   plannerDateToDate(date.value)
      //   // )
      // }
      // onSelectWeek={(date) =>
      //   // updateCurrentLayoutAndNavigate(PLANNER_LAYOUTS.WEEK, date.aroundDate)
      // }
    />
  );
};
