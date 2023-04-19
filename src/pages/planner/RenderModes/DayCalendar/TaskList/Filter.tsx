import { initialFiltersValues, useEventFilters } from '@hooks/useEventFilters';
import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate, plannerSelectStatus } from '@selectors/planner';
import dayjs from 'dayjs';
import React, { FC, memo, useEffect, useMemo } from 'react';

import { PLANNER_LAYOUTS, UTC_OFFSET } from '@src/common/constants';

import { FindEventFilter } from '@planner/RenderModes/FindEventFilter/FindEventFilter';

import { useGetShortEventsArrayQuery } from '@api/planning-api';
import { SortedEventsObject } from '@api/planning-api/types/event-info.types';

export interface DayTaskListFilterProps {
  updateState(arr: SortedEventsObject): void;
}

export const DayTaskListFilter: FC<DayTaskListFilterProps> = memo(
  ({ updateState }) => {
    const day = useAppSelector(plannerSelectDate);
    const currentStatus = useAppSelector(plannerSelectStatus);

    const { filters, debounceValue, handlers } = useEventFilters({
      initialValues: initialFiltersValues(
        plannerDateToDate(day),
        currentStatus
      ),
      layout: PLANNER_LAYOUTS.DAY,
    });

    const queryArgs = useMemo(() => {
      return {
        fromDate:
          dayjs(plannerDateToDate(day)).startOf('day').toDate().toString() ||
          '',
        toDate:
          dayjs(plannerDateToDate(day)).endOf('day').toDate().toString() || '',
        title: debounceValue.title,
        priority:
          debounceValue.priority === 'not_selected'
            ? null
            : debounceValue.priority,
        utcOffset: UTC_OFFSET,
        findOnlyInSelectedGroups: true,
        taskStatus: currentStatus,
      };
    }, [debounceValue, day, currentStatus]);

    const {
      data: eventList,
      error,
      isFetching: isFetchingTasks,
    } = useGetShortEventsArrayQuery(queryArgs, {
      refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
      updateState(eventList || { throughEvents: [], baseEvents: [] });
    }, [eventList]);

    return <FindEventFilter />;
  }
);
