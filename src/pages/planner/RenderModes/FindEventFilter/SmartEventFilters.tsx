import { useEventStorage } from '@hooks/useEventStorage';
import React, { FC, memo } from 'react';

import { disableReRender } from '@src/common/utils/react-utils';

import { FindEventFilter } from '@planner/RenderModes/FindEventFilter/FindEventFilter';
import { EventsStorage } from '@planner/planner.types';

import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';

export interface WeekFiltersProps {
  updateStorage(storage: EventsStorage<ShortEventInfoModel>): void;

  onlyFavorites?: boolean;
}

export const SmartEventFilters: FC<WeekFiltersProps> = memo(
  ({ updateStorage, onlyFavorites }) => {
    const { filters, handlers, isFetching } = useEventStorage({
      onlyFavorites,
    });

    return <FindEventFilter />;
  },
  disableReRender
);
