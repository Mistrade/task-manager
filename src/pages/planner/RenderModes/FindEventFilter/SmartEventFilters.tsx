import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';
import { useEventStorage } from '@hooks/useEventStorage';
import { EventsStorage } from '@planner/planner.types';
import { FindEventFilter } from '@planner/RenderModes/FindEventFilter/FindEventFilter';
import React, { FC, useEffect } from 'react';

export interface WeekFiltersProps {
  updateStorage(storage: EventsStorage<ShortEventInfoModel>): void;
}

export const SmartEventFilters: FC<WeekFiltersProps> = ({ updateStorage }) => {
  const { filters, handlers, isFetching, TaskStorage } = useEventStorage();

  useEffect(() => {
    updateStorage(TaskStorage || {});
  }, [TaskStorage]);

  return (
    <FindEventFilter
      values={filters}
      onChangeHandlers={handlers}
      isLoading={isFetching}
    />
  );
};
