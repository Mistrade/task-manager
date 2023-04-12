import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate } from '@selectors/planner';
import { MonthList, PLANNER_LAYOUTS } from '@src/common/constants';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { memo, useCallback, useMemo } from 'react';

export const WeekBreadCrumbs = memo(() => {
  const currentDate = useAppSelector(plannerSelectDate);
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(
    (layout: PLANNER_LAYOUTS) => {
      dispatch(
        setPlannerDateAndLayout({
          layout,
          date: currentDate,
        })
      );
    },
    [currentDate]
  );

  const data = useMemo(() => {
    return [
      {
        title: `${currentDate.year}г.`,
        value: PLANNER_LAYOUTS.YEAR,
      },
      {
        title: `${MonthList[currentDate.month]}`,
        value: PLANNER_LAYOUTS.MONTH,
      },
    ];
  }, [currentDate]);

  return <BreadCrumbs data={data} onClick={clickHandler} />;
}, disableReRender);
