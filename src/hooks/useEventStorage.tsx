import { EventsStorage, PlannerMode } from '../pages/Planner/planner.types';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import {
  EventFiltersProps,
  useEventFilters,
  UseEventFiltersReturned,
} from './useEventFilters';
import {
  useGetEventsCountOfStatusQuery,
  useGetEventsStorageQuery,
} from '../store/api/planning-api';
import { SwitcherBadges } from '../components/Switcher/Switcher';
import { GetEventsFiltersRequestProps } from '../store/api/planning-api/types/event-info.types';
import { EventFilterTaskStatuses } from '../pages/Planner/RenderModes/FindEventFilter/find-event-filters.types';
import { UTC_OFFSET } from '../common/constants';

interface Scope {
  start: Date;
  end: Date;
}

interface UseTaskStorageProps {
  scope: Scope;
  layout: PlannerMode['layout'];
  onlyFavorites?: boolean;
}

interface UseTaskStorageQueryArgsReturned extends UseEventFiltersReturned {
  queryArgs: GetEventsFiltersRequestProps;
  taskStatus: EventFiltersProps['status'];
  TaskStorage?: EventsStorage;
  SwitcherBadges?: SwitcherBadges<EventFilterTaskStatuses> | null;
  isFetching: boolean;
}

type UseTaskStorageQueryArgsHookType = (
  props: UseTaskStorageProps
) => UseTaskStorageQueryArgsReturned;

const getQueryArgs = (
  values: EventFiltersProps,
  props: UseTaskStorageProps
): GetEventsFiltersRequestProps => {
  return {
    title: values.title,
    fromDate: props.scope.start?.toString() || '',
    toDate: props.scope?.toString() || '',
    priority: values.priority,
    taskStatus: values.status,
    onlyFavorites: !!props.onlyFavorites,
    utcOffset: UTC_OFFSET,
  };
};

export const useEventStorage: UseTaskStorageQueryArgsHookType = (props) => {
  const dispatch = useAppDispatch();
  const { statuses: taskStatus } = useAppSelector((state) => state.planner);

  const filtersReturned = useEventFilters({
    initialValues: {
      title: null,
      status: taskStatus,
      priority: null,
    },
    layout: props.layout,
  });

  const queryArgs = useMemo(
    () => getQueryArgs(filtersReturned.filters, props),
    [filtersReturned.filters, props]
  );

  const {
    data: TaskStorage,
    refetch,
    isFetching: isFetchingStorage,
  } = useGetEventsStorageQuery(
    {
      ...queryArgs,
      findOnlyInSelectedGroups: true,
    },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: SwitcherBadges,
    refetch: refetchBadges,
    isFetching: isFetchingBadges,
  } = useGetEventsCountOfStatusQuery({
    title: queryArgs.title,
    fromDate: queryArgs.fromDate,
    toDate: queryArgs.toDate,
    priority: queryArgs.priority,
    onlyFavorites: queryArgs.onlyFavorites,
    utcOffset: queryArgs.utcOffset,
    findOnlyInSelectedGroups: true,
  });

  return {
    queryArgs,
    taskStatus: filtersReturned.debounceValue.status,
    TaskStorage: TaskStorage?.data || {},
    SwitcherBadges: SwitcherBadges?.data,
    ...filtersReturned,
    isFetching: isFetchingBadges || isFetchingStorage,
  };
};
