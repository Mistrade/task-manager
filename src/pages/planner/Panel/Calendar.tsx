import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { dateToPlannerDate, plannerDateToDate } from '@planner-reducer/utils';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import {
  plannerSelectDate,
  plannerSelectPanelConfig,
} from '@selectors/planner';
import React, { FC, useMemo } from 'react';

import { PLANNER_LAYOUTS, SERVICES_NAMES } from '@src/common/constants/enums';
import { getPath } from '@src/common/functions';

import { DateWithTooltipPlanner } from '@planner/SmallMonth/DateWithTooltipPlanner';
import { SmallCalendarMonthTitle } from '@planner/SmallMonth/SmallCalendarMonthTitle';
import { SmallMonth } from '@planner/SmallMonth/SmallMonth';
import { PlannerMonthMode } from '@planner/types';

export const OptionPanelCalendar: FC = () => {
  const currentDate = useAppSelector(plannerSelectDate);
  const config = useAppSelector(plannerSelectPanelConfig);
  const dispatch = useAppDispatch();
  const navigate = useSearchNavigate();
  const MonthCurrent: PlannerMonthMode = useMemo(
    () => ({
      layout: 'month',
      month: config.monthOfYear,
      year: config.year,
    }),
    []
  );

  return (
    <SmallMonth
      dateComponent={DateWithTooltipPlanner}
      monthItem={config}
      title={
        <SmallCalendarMonthTitle
          isCurrentMonth={true}
          monthItem={config}
          onClick={(data) => {
            dispatch(
              setPlannerDateAndLayout({
                date: data.stateDate,
                layout: PLANNER_LAYOUTS.MONTH,
              })
            );
            navigate(getPath(SERVICES_NAMES.PLANNER, PLANNER_LAYOUTS.MONTH));
          }}
        />
      }
      current={MonthCurrent}
      value={plannerDateToDate(currentDate)}
      onSelectDate={(date) => {
        dispatch(
          setPlannerDateAndLayout({
            date: date.value,
            layout: PLANNER_LAYOUTS.DAY,
          })
        );
        navigate(getPath(SERVICES_NAMES.PLANNER, PLANNER_LAYOUTS.DAY));
      }}
      onSelectWeek={(date) => {
        dispatch(
          setPlannerDateAndLayout({
            date: dateToPlannerDate(date.aroundDate),
            layout: PLANNER_LAYOUTS.WEEK,
          })
        );
        navigate(getPath(SERVICES_NAMES.PLANNER, PLANNER_LAYOUTS.WEEK));
      }}
    />
  );
};
