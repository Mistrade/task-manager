import { useEventStorageQueryArgs } from '@hooks/useEventStorageQueryArgs';
import { setPlannerLayout } from '@planner-reducer/index';
import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout, plannerSelectScope } from '@selectors/planner';
import React, { FC, memo, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';

import { ShortMonthList } from '@src/common/constants/constants';
import { PLANNER_LAYOUTS } from '@src/common/constants/enums';

import { ListCalendarModeProps } from '@planner/types';

import { useGetEventsStorageQuery } from '@api/planning-api';

import { ListModeTaskController } from './ListModeTaskController';

export const ListCalendarMode: FC<ListCalendarModeProps> = memo(() => {
  const scope = useAppSelector(plannerSelectScope);
  const args = useEventStorageQueryArgs();
  const { data: storage } = useGetEventsStorageQuery(args);

  const layout = useAppSelector(plannerSelectLayout);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (layout !== PLANNER_LAYOUTS.LIST) {
      dispatch(setPlannerLayout(PLANNER_LAYOUTS.LIST));
    }
  }, []);

  return (
    <>
      <Helmet
        title={`События ${scope.startDate.day} ${
          ShortMonthList[scope.startDate.month]
        } - ${scope.endDate.day} ${ShortMonthList[scope.endDate.month]}`}
      />
      <ListModeTaskController
        eventStorage={storage?.data || {}}
        fromDate={plannerDateToDate(scope.startDate)}
        toDate={plannerDateToDate(scope.endDate)}
      />
    </>
  );
});
