import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate } from '@selectors/planner';
import React, { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  MonthList,
  PLANNER_LAYOUTS,
  SERVICES_NAMES,
} from '@src/common/constants';
import { disableReRender } from '@src/common/utils/react-utils';

import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';

export const DayLayoutBreadCrumbs = memo(() => {
  const navigate = useNavigate();
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
        navigate(`/${SERVICES_NAMES.PLANNER}/${data}`);
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
