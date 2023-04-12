import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate } from '@selectors/planner';
import { PLANNER_LAYOUTS } from '@src/common/constants';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { memo, useCallback, useMemo } from 'react';

export const MonthBreadCrumbs = memo(() => {
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
    ];
  }, [currentDate]);

  return <BreadCrumbs data={data} onClick={clickHandler} />;
}, disableReRender);
