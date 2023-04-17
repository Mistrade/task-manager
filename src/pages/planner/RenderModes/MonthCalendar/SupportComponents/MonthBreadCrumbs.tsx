import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate } from '@selectors/planner';
import React, { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { PLANNER_LAYOUTS, SERVICES_NAMES } from '@src/common/constants';
import { disableReRender } from '@src/common/utils/react-utils';

import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';

export const MonthBreadCrumbs = memo(() => {
  const currentDate = useAppSelector(plannerSelectDate);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(plannerSelectDate);

  const clickHandler = useCallback(
    (layout: PLANNER_LAYOUTS) => {
      dispatch(
        setPlannerDateAndLayout({
          layout,
          date: currentDate,
        })
      );
      navigate(`/${SERVICES_NAMES.PLANNER}/${layout}/${status}`);
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
