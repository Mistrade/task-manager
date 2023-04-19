import { useEventStorageQueryArgs } from '@hooks/useEventStorageQueryArgs';
import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectScope } from '@selectors/planner';
import React, { FC, memo } from 'react';
import { Helmet } from 'react-helmet';

import { ShortMonthList } from '@src/common/constants/constants';

import { ListCalendarModeProps } from '@planner/types';

import { useGetEventsStorageQuery } from '@api/planning-api';

import { ListModeTaskController } from './ListModeTaskController';


export const ListCalendarMode: FC<ListCalendarModeProps> = memo(() => {
  const scope = useAppSelector(plannerSelectScope);
  const args = useEventStorageQueryArgs();
  const { data: storage } = useGetEventsStorageQuery(args);

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