import React, { FC, useContext, useMemo } from 'react';
import { EventsStorage, ListCalendarModeProps } from '../../planner.types';
import { FindEventFilter } from '../FindEventFilter/FindEventFilter';
import { ListModeTaskController } from './ListModeTaskController';
import { useEventStorage } from '../../../../hooks/useEventStorage';
import { ShortEventInfoModel } from '../../../../store/api/planning-api/types/event-info.types';
import { ScrollVerticalView } from '../../../../components/LayoutComponents/ScrollView/ScrollVerticalView';
import { PlannerContext } from '../../../../Context/planner.context';
import dayjs from 'dayjs';
import { PLANNER_LAYOUTS } from '../../../../common/constants';

export const ListCalendarMode: FC<ListCalendarModeProps> = ({}) => {
  const { currentDate } = useContext(PlannerContext);

  const scope = useMemo(() => {
    return {
      start: dayjs(currentDate.list).startOf('day').toDate(),
      end: dayjs(currentDate.list).add(3, 'day').endOf('day').toDate(),
    };
  }, [currentDate.list]);

  const {
    TaskStorage,
    SwitcherBadges,
    handlers,
    filters,
    debounceValue,
    isFetching,
  } = useEventStorage({
    layout: PLANNER_LAYOUTS.LIST,
    scope: scope,
  });

  return (
    <ScrollVerticalView
      staticContent={
        <FindEventFilter
          values={filters}
          onChangeHandlers={{
            ...handlers,
          }}
          statusBadges={SwitcherBadges}
          isLoading={isFetching}
        />
      }
      placementStatic={'top'}
      renderPattern={'top-bottom'}
    >
      <ListModeTaskController
        eventStorage={TaskStorage as EventsStorage<ShortEventInfoModel>}
        fromDate={scope.start}
        toDate={scope.end}
      />
    </ScrollVerticalView>
  );
};
