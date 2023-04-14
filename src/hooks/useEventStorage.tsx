import { useGetEventsStorageQuery } from '@api/planning-api';
import { plannerDateToDate } from '@planner-reducer/utils';
import { EventsStorage } from '@planner/planner.types';
import { useAppSelector } from '@redux/hooks/hooks';
import {
  plannerSelectLayout,
  plannerSelectScope,
  plannerSelectStatus,
} from '@selectors/planner';
import { UTC_OFFSET } from '@src/common/constants';
import { useMemo } from 'react';
import {
  EventFiltersProps,
  useEventFilters,
  UseEventFiltersReturned,
} from './useEventFilters';

interface UseTaskStorageProps {
  onlyFavorites?: boolean;
}

interface UseTaskStorageQueryArgsReturned extends UseEventFiltersReturned {
  taskStatus: EventFiltersProps['taskStatus'];
  TaskStorage?: EventsStorage;
  isFetching: boolean;
}

type UseTaskStorageQueryArgsHookType = (
  props?: UseTaskStorageProps
) => UseTaskStorageQueryArgsReturned;

export const useEventStorage: UseTaskStorageQueryArgsHookType = (props) => {
  const layout = useAppSelector(plannerSelectLayout);
  const currentStatus = useAppSelector(plannerSelectStatus);
  const scope = useAppSelector(plannerSelectScope);

  const { debounceValue, filters, handlers, setFiltersState } = useEventFilters(
    {
      initialValues: {
        start: null,
        end: null,
        utcOffset: UTC_OFFSET,
        title: null,
        taskStatus: currentStatus,
        priority: null,
      },
      layout,
    }
  );

  const args = useMemo(() => {
    return {
      fromDate: plannerDateToDate(scope.startDate).toString(),
      toDate: plannerDateToDate(scope.endDate).toString(),
      taskStatus: currentStatus,
      title: debounceValue.title,
      priority: debounceValue.priority,
      onlyFavorites: !!props?.onlyFavorites,
      utcOffset: UTC_OFFSET,
      findOnlyInSelectedGroups: true,
    };
  }, [
    props?.onlyFavorites,
    debounceValue.title,
    debounceValue.priority,
    currentStatus,
    scope,
  ]);

  const { data: TaskStorage, isFetching } = useGetEventsStorageQuery(args, {
    refetchOnMountOrArgChange: true,
  });

  console.log(TaskStorage);

  return {
    taskStatus: currentStatus,
    TaskStorage: TaskStorage?.data || {},
    filters,
    handlers,
    isFetching,
    debounceValue,
    setFiltersState,
  };
};
