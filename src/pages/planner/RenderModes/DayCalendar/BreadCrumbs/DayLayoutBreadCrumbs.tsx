import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { ServicesNames } from '@redux/reducers/global';
import { plannerSelectDate, plannerSelectStatus } from '@selectors/planner';
import React, { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { MonthList, PLANNER_LAYOUTS } from '@src/common/constants';
import { disableReRender } from '@src/common/utils/react-utils';

import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';


export const DayLayoutBreadCrumbs = memo(() => {
  const navigate = useNavigate();
  const status = useAppSelector(plannerSelectStatus);
  const date = useAppSelector(plannerSelectDate);
  const dispatch = useAppDispatch();
  const data = useMemo(
    () => [
      {
        title: `${date.year}г.`,
        value: PLANNER_LAYOUTS.YEAR,
      },
      {
        title: `${MonthList[date.month]}`,
        value: PLANNER_LAYOUTS.MONTH,
      },
      {
        title: `Неделя ${date.week}`,
        value: PLANNER_LAYOUTS.WEEK,
      },
    ],
    [date]
  );

  return (
    <BreadCrumbs
      data={data}
      onClick={(data) => {
        navigate(`/${ServicesNames.PLANNER}/${data}/${status}`);
        dispatch(
          setPlannerDateAndLayout({
            date,
            layout: data,
          })
        );
      }}
    />
  );
}, disableReRender);