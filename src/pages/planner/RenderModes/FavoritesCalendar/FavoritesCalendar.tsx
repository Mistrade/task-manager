import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectScope } from '@selectors/planner';
import React, { FC, useState } from 'react';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';

import { SmartEventFilters } from '@planner/RenderModes/FindEventFilter/SmartEventFilters';
import { ListModeTaskController } from '@planner/RenderModes/List/ListModeTaskController';
import {
  EventsStorage,
  FavoritesCalendarModeProps,
} from '@planner/planner.types';

import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';


export const FavoritesCalendar: FC<FavoritesCalendarModeProps> = ({}) => {
  const scope = useAppSelector(plannerSelectScope);
  const [storage, setStorage] = useState<EventsStorage>(() => ({}));

  return (
    <ScrollVerticalView
      renderPattern={'top-bottom'}
      placementStatic={'top'}
      staticContent={
        <FlexBlock direction={'column'}>
          <SmartEventFilters onlyFavorites={true} updateStorage={setStorage} />
        </FlexBlock>
      }
    >
      <ListModeTaskController
        eventStorage={storage as EventsStorage<ShortEventInfoModel>}
        fromDate={plannerDateToDate(scope.startDate)}
        toDate={plannerDateToDate(scope.endDate)}
      />
    </ScrollVerticalView>
  );
};