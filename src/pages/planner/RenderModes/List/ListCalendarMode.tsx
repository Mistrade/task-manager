import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectScope } from '@selectors/planner';
import React, { FC, useState } from 'react';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';

import { SmartEventFilters } from '@planner/RenderModes/FindEventFilter/SmartEventFilters';
import { EventsStorage, ListCalendarModeProps } from '@planner/planner.types';

import { ListModeTaskController } from './ListModeTaskController';


export const ListCalendarMode: FC<ListCalendarModeProps> = () => {
  const scope = useAppSelector(plannerSelectScope);
  const [state, setState] = useState<EventsStorage>({});

  return (
    <ScrollVerticalView
      staticContent={
        <FlexBlock direction={'column'}>
          <SmartEventFilters updateStorage={setState} />
        </FlexBlock>
      }
      placementStatic={'top'}
      renderPattern={'top-bottom'}
    >
      <ListModeTaskController
        eventStorage={state}
        fromDate={plannerDateToDate(scope.startDate)}
        toDate={plannerDateToDate(scope.endDate)}
      />
    </ScrollVerticalView>
  );
};