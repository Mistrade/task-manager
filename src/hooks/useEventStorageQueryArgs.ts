import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectFilters, plannerSelectScope } from '@selectors/planner';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { UTC_OFFSET } from '@src/common/constants';

import { GetEventsFiltersRequestProps } from '@api/planning-api/types/event-info.types';

export const useEventStorageQueryArgs: (props?: {
  onlyFavorites?: boolean;
}) => GetEventsFiltersRequestProps = (props) => {
  const scope = useAppSelector(plannerSelectScope);
  const filters = useAppSelector(plannerSelectFilters);

  return useMemo(() => {
    return {
      utcOffset: UTC_OFFSET,
      fromDate: dayjs(plannerDateToDate(scope.startDate))
        .startOf('day')
        .toString(),
      toDate: dayjs(plannerDateToDate(scope.endDate)).endOf('day').toString(),
      taskStatus: filters.taskStatus,
      onlyFavorites: props?.onlyFavorites || false,
      title: filters.title,
      findOnlyInSelectedGroups: true,
      priority: filters.priority,
    };
  }, [filters, scope, props?.onlyFavorites]);
};
