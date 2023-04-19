import { useEventStorageQueryArgs } from '@hooks/useEventStorageQueryArgs';
import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectScope } from '@selectors/planner';
import React, { FC, memo } from 'react';
import { Helmet } from 'react-helmet';

import { ListModeTaskController } from '@planner/RenderModes/List/ListModeTaskController';
import { FavoritesCalendarModeProps } from '@planner/planner.types';

import { useGetEventsStorageQuery } from '@api/planning-api';


export const FavoritesCalendar: FC<FavoritesCalendarModeProps> = memo(() => {
  const scope = useAppSelector(plannerSelectScope);
  const args = useEventStorageQueryArgs({ onlyFavorites: true });
  const { data: storage } = useGetEventsStorageQuery(args);
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