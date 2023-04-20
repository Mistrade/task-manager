import { useEventStorageQueryArgs } from '@hooks/useEventStorageQueryArgs';
import { setPlannerLayout } from '@planner-reducer/index';
import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout, plannerSelectScope } from '@selectors/planner';
import React, { FC, memo, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';

import { PLANNER_LAYOUTS } from '@src/common/constants/enums';

import { ListModeTaskController } from '@planner/Modes/List/ListModeTaskController';
import { FavoritesCalendarModeProps } from '@planner/types';

import { useGetEventsStorageQuery } from '@api/planning-api';

export const FavoritesCalendar: FC<FavoritesCalendarModeProps> = memo(() => {
  const scope = useAppSelector(plannerSelectScope);
  const args = useEventStorageQueryArgs({ onlyFavorites: true });
  const { data: storage } = useGetEventsStorageQuery(args);

  const layout = useAppSelector(plannerSelectLayout);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (layout !== PLANNER_LAYOUTS.FAVORITES) {
      dispatch(setPlannerLayout(PLANNER_LAYOUTS.FAVORITES));
    }
  }, []);

  return (
    <>
      <Helmet title={'Избранные события'} />
      <ListModeTaskController
        eventStorage={storage?.data || {}}
        fromDate={plannerDateToDate(scope.startDate)}
        toDate={plannerDateToDate(scope.endDate)}
      />
    </>
  );
});
