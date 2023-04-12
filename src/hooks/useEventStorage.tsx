import { EventsStorage, PlannerMode } from '@planner/planner.types';
import { useContext, useMemo } from 'react';
import {
  EventFiltersProps,
  useEventFilters,
  UseEventFiltersReturned,
} from './useEventFilters';
import {
  useGetEventsCountOfStatusQuery,
  useGetEventsStorageQuery,
} from '@api/planning-api';
import { SwitcherBadges } from '@components/Switcher/Switcher';
import { GetEventsFiltersRequestProps } from '@api/planning-api/types/event-info.types';
import { EventFilterTaskStatuses } from '@planner/RenderModes/FindEventFilter/find-event-filters.types';
import { UTC_OFFSET } from '@src/common/constants';
import { PlannerContext } from '@src/Context/planner.context';

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
  taskStatus: EventFiltersProps['taskStatus'];
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
  console.log('queryArgs');
  return {
    title: values.title,
    fromDate: props.scope.start?.toString() || '',
    toDate: props.scope?.end.toString() || '',
    priority: values.priority,
    taskStatus: values.taskStatus,
    onlyFavorites: !!props.onlyFavorites,
    utcOffset: UTC_OFFSET,
  };
};

export const useEventStorage: UseTaskStorageQueryArgsHookType = (props) => {
  const { currentStatus } = useContext(PlannerContext);

  const filtersReturned = useEventFilters({
    initialValues: {
      start: null,
      end: null,
      utcOffset: UTC_OFFSET,
      title: null,
      taskStatus: currentStatus,
      priority: null,
    },
    layout: props.layout,
  });

  const queryArgs = useMemo(
    () => getQueryArgs(filtersReturned.debounceValue, props),
    [filtersReturned.debounceValue, props]
  );

  const { data: TaskStorage, isFetching: isFetchingStorage } =
    useGetEventsStorageQuery(
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
    ...queryArgs,
    findOnlyInSelectedGroups: true,
  });

  return {
    queryArgs,
    taskStatus: filtersReturned.debounceValue.taskStatus,
    TaskStorage: TaskStorage?.data || {},
    SwitcherBadges: SwitcherBadges?.data,
    ...filtersReturned,
    isFetching: isFetchingBadges || isFetchingStorage,
  };
};
