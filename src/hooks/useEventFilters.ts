import { setPlannerStatus } from '@planner-reducer/index';
import { useAppDispatch } from '@redux/hooks/hooks';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';

import { EventFilterOnChangeHandle } from '@planner/RenderModes/FindEventFilter/find-event-filters.types';
import { PlannerMode } from '@planner/planner.types';

import { GetEventsFiltersRequestProps } from '@api/planning-api/types/event-info.types';

import { useDebounce } from './useDebounce';

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

//TODO дописать чтобы починить логику в связях
export const useEventFilters: UseEventFiltersType = ({
  initialValues,
  layout,
  useNavigate = true,
  debounceTimeout = 1250,
}) => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<EventFiltersProps>(initialValues);

  const debounceValue = useDebounce(filters, debounceTimeout || 1250);

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
      taskStatus: (newStatus) => {
        dispatch(setPlannerStatus(newStatus || 'all'));
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
