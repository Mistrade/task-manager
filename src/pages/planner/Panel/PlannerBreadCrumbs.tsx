import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { IPlannerDate } from '@planner-reducer/types';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate, plannerSelectLayout } from '@selectors/planner';
import { memo, useCallback, useMemo } from 'react';

import {
  BreadCrumbs,
  BreadCrumbsItem,
} from '@components/BreadCrumbs/BreadCrumbs';

import { MonthList } from '../../../common/constants/constants';
import {
  PLANNER_LAYOUTS,
  SERVICES_NAMES,
} from '../../../common/constants/enums';
import { getPath } from '../../../common/functions';
import { disableReRender } from '../../../common/utils/react-utils';

interface IPlannerBreadCrumbsItem {
  layout: PLANNER_LAYOUTS;
  date: IPlannerDate;
}

const getMonthBreadCrumbs = (
  date: IPlannerDate
): Array<BreadCrumbsItem<IPlannerBreadCrumbsItem>> => {
  return [
    {
      title: `${date.year} г.`,
      value: {
        layout: PLANNER_LAYOUTS.YEAR,
        date,
      },
    },
  ];
};

const getWeekBreadCrumbs = (
  date: IPlannerDate
): Array<BreadCrumbsItem<IPlannerBreadCrumbsItem>> => {
  return [
    ...getMonthBreadCrumbs(date),
    {
      title: MonthList[date.month],
      value: {
        layout: PLANNER_LAYOUTS.MONTH,
        date,
      },
    },
  ];
};

const getDateBreadCrumbs = (
  date: IPlannerDate
): Array<BreadCrumbsItem<IPlannerBreadCrumbsItem>> => {
  return [
    ...getWeekBreadCrumbs(date),
    {
      title: `Неделя ${date.week}`,
      value: {
        layout: PLANNER_LAYOUTS.WEEK,
        date,
      },
    },
  ];
};

function generateBreadCrumbsArr(layout: PLANNER_LAYOUTS, date: IPlannerDate) {
  switch (layout) {
    case PLANNER_LAYOUTS.YEAR:
      return [];
    case PLANNER_LAYOUTS.MONTH:
      return getMonthBreadCrumbs(date);
    case PLANNER_LAYOUTS.WEEK:
      return getWeekBreadCrumbs(date);
    case PLANNER_LAYOUTS.LIST:
    case PLANNER_LAYOUTS.DAY:
    case PLANNER_LAYOUTS.FAVORITES:
      return getDateBreadCrumbs(date);
  }
}

export const PlannerBreadCrumbs = memo(() => {
  const layout = useAppSelector(plannerSelectLayout);
  const currentDate = useAppSelector(plannerSelectDate);
  const arr = useMemo(() => {
    return generateBreadCrumbsArr(layout, currentDate);
  }, [layout, currentDate]);
  const navigate = useSearchNavigate();
  const dispatch = useAppDispatch();

  const clickHandler = useCallback((data: IPlannerBreadCrumbsItem) => {
    dispatch(setPlannerDateAndLayout(data));
    navigate(getPath(SERVICES_NAMES.PLANNER, data.layout));
  }, []);

  if (arr.length) {
    return <BreadCrumbs data={arr} onClick={clickHandler} />;
  }
  return <></>;
}, disableReRender);
