import { useCallback, useContext, useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';
import {
  CalendarPriorityKeys,
  PlannerMode,
} from '../pages/Planner/planner.types';
import {
  EventFilterOnChangeHandle,
  EventFilterTaskStatuses,
} from '../pages/Planner/RenderModes/FindEventFilter/find-event-filters.types';
import { PlannerContext } from '../Context/planner.context';
import { DEFAULT_PLANNER_STATUS } from '../common/constants';

export interface EventFiltersProps {
  status: EventFilterTaskStatuses;
  title: string | null;
  priority: CalendarPriorityKeys | null;
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
  taskStatus: EventFiltersProps['status']
) => EventFiltersProps = (taskStatus) => ({
  title: null,
  priority: null,
  status: taskStatus,
});

export const useEventFilters: UseEventFiltersType = ({
  initialValues,
  layout,
  useNavigate = true,
  debounceTimeout,
}) => {
  const [filters, setFilters] = useState<EventFiltersProps>(initialValues);
  const {
    methods: { updateCurrentStatus, plannerNavigate },
  } = useContext(PlannerContext);
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
      title: (value) => changeFiltersStateHandler('title', value),
      priority: (key) =>
        changeFiltersStateHandler(
          'priority',
          key === 'not_selected' ? null : key
        ),
      taskStatus: (value) => {
        if (useNavigate) {
          updateCurrentStatus(value || DEFAULT_PLANNER_STATUS);
          console.log('Это тут');
          plannerNavigate('status').go(value || DEFAULT_PLANNER_STATUS);
        }
        changeFiltersStateHandler('status', value);
      },
    }),
    [layout, useNavigate, plannerNavigate, updateCurrentStatus]
  );

  const setFiltersState = useCallback(
    (values: EventFiltersProps) => {
      setFilters(values);
      //TODO добавить обработку статуса
      eventFiltersHandlers.taskStatus(values.status);
    },
    [eventFiltersHandlers]
  );

  return {
    handlers: eventFiltersHandlers,
    setFiltersState,
    filters: filters,
    debounceValue: debounceValue,
  };
};
