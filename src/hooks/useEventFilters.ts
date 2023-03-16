import { useCallback, useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';
import { PlannerMode } from '../pages/Planner/planner.types';
import dayjs from 'dayjs';
import { useAppDispatch } from '../store/hooks/hooks';
import { changeEventStatuses } from '../store/reducers/planner-reducer';
import { useSearchNavigate } from './useSearchNavigate';
import { GetEventsFiltersRequestProps } from '../store/api/planning-api/types/event-info.types';
import { EventFilterOnChangeHandle } from '../pages/Planner/RenderModes/FindEventFilter/find-event-filters.types';

export interface EventFiltersProps
  extends Omit<GetEventsFiltersRequestProps, 'fromDate' | 'toDate'> {
  start: Date | null;
  end: Date | null;
}

export interface UseEventFiltersProps {
  initialValues: EventFiltersProps;
  layout: PlannerMode['layout'];
  useNavigate?: boolean;
  debounceTimeout?: number;
}

export interface UseEventFiltersReturned {
  handlers: EventFilterOnChangeHandle;
  setFiltersState: (values: EventFiltersProps) => void;
  filters: EventFiltersProps;
  debounceValue: EventFiltersProps;
}

export type UseEventFiltersType = (
  options: UseEventFiltersProps
) => UseEventFiltersReturned;

export const initialFiltersValues: (
  day: Date,
  taskStatus: EventFiltersProps['taskStatus']
) => EventFiltersProps = (day, taskStatus) => ({
  title: null,
  priority: null,
  start: dayjs(day).startOf('day').toDate(),
  end: dayjs(day).endOf('day').toDate(),
  taskStatus,
  utcOffset: dayjs().utcOffset(),
});

export const useEventFilters: UseEventFiltersType = ({
  initialValues,
  layout,
  useNavigate = true,
  debounceTimeout,
}) => {
  const navigate = useSearchNavigate();
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<EventFiltersProps>(initialValues);

  const debounceValue = useDebounce(filters, debounceTimeout || 300);

  const changeFiltersStateHandler = <T extends keyof EventFiltersProps>(
    fieldName: T,
    value: EventFiltersProps[T]
  ) => {
    setFilters((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  const eventFiltersHandlers: EventFilterOnChangeHandle = useMemo(
    () => ({
      start: (date) => changeFiltersStateHandler('start', date),
      end: (date) => changeFiltersStateHandler('end', date),
      title: (value) => changeFiltersStateHandler('title', value),
      priority: (key) =>
        changeFiltersStateHandler(
          'priority',
          key === 'not_selected' ? null : key
        ),
      taskStatus: (value) => {
        if (useNavigate) {
          navigate(`/planner/${layout}/${value}`);
          dispatch(changeEventStatuses(value || 'all'));
        }
        changeFiltersStateHandler('taskStatus', value);
      },
    }),
    [layout, useNavigate]
  );

  const setFiltersState = useCallback((values: EventFiltersProps) => {
    setFilters(values);
  }, []);

  return {
    handlers: eventFiltersHandlers,
    setFiltersState,
    filters: filters,
    debounceValue: debounceValue,
  };
};
