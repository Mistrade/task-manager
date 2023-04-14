import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';
import { useEventStorage } from '@hooks/useEventStorage';
import { EventsStorage } from '@planner/planner.types';
import { FindEventFilter } from '@planner/RenderModes/FindEventFilter/FindEventFilter';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { FC, memo, useEffect } from 'react';

export interface WeekFiltersProps {
  updateStorage(storage: EventsStorage<ShortEventInfoModel>): void;
  onlyFavorites?: boolean;
}

export const SmartEventFilters: FC<WeekFiltersProps> = memo(
  ({ updateStorage, onlyFavorites }) => {
    const { filters, handlers, isFetching, TaskStorage } = useEventStorage({
      onlyFavorites,
    });

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
  },
  disableReRender
);
