import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { dateToPlannerDate, plannerDateToDate } from '@planner-reducer/utils';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { ServicesNames } from '@redux/reducers/global';
import {
  plannerSelectDate,
  plannerSelectPanelConfig,
  plannerSelectStatus,
} from '@selectors/planner';
import React, { FC, useMemo } from 'react';

import { PLANNER_LAYOUTS } from '@src/common/constants';
import { getPath } from '@src/common/functions';

import { SmallCalendarMonthTitle } from '@planner/SmallMotnCalendar/SmallCalendarMonthTitle';
import { SmallMonth } from '@planner/SmallMotnCalendar/SmallMonth';
import { PlannerMonthMode } from '@planner/planner.types';


export const OptionPanelCalendar: FC = () => {
  const currentDate = useAppSelector(plannerSelectDate);
  const config = useAppSelector(plannerSelectPanelConfig);
  const status = useAppSelector(plannerSelectStatus);
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
      monthItem={config}
      title={
        <SmallCalendarMonthTitle
          monthItem={config}
          onClick={(data) => {
            dispatch(
              setPlannerDateAndLayout({
                date: data.stateDate,
                layout: PLANNER_LAYOUTS.MONTH,
              })
            );
            navigate(
              getPath(ServicesNames.PLANNER, PLANNER_LAYOUTS.MONTH, status)
            );
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
        navigate(getPath(ServicesNames.PLANNER, PLANNER_LAYOUTS.DAY, status));
      }}
      onSelectWeek={(date) => {
        dispatch(
          setPlannerDateAndLayout({
            date: dateToPlannerDate(date.aroundDate),
            layout: PLANNER_LAYOUTS.WEEK,
          })
        );
        navigate(getPath(ServicesNames.PLANNER, PLANNER_LAYOUTS.WEEK, status));
      }}
    />
  );
};