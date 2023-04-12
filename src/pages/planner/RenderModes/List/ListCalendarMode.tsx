import React, { FC, useContext, useMemo } from 'react';
import { EventsStorage, ListCalendarModeProps } from '@planner/planner.types';
import { FindEventFilter } from '@planner/RenderModes/FindEventFilter/FindEventFilter';
import { ListModeTaskController } from './ListModeTaskController';
import { useEventStorage } from '@hooks/useEventStorage';
import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { PlannerContext } from '@src/Context/planner.context';
import dayjs from 'dayjs';
import { MonthList, PLANNER_LAYOUTS } from '@src/common/constants';
import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

export const ListCalendarMode: FC<ListCalendarModeProps> = ({}) => {
  const {
    currentDate,
    methods: { updateCurrentLayoutAndNavigate },
  } = useContext(PlannerContext);

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
        <FlexBlock direction={'column'}>
          <BreadCrumbs
            data={[
              {
                title: `${currentDate.list.getFullYear()}г.`,
                value: PLANNER_LAYOUTS.YEAR,
              },
              {
                title: `${MonthList[currentDate.list.getMonth()]}`,
                value: PLANNER_LAYOUTS.MONTH,
              },
              {
                title: `Неделя ${dayjs(currentDate.list).week()}`,
                value: PLANNER_LAYOUTS.WEEK,
              },
            ]}
            onClick={(data) => {
              updateCurrentLayoutAndNavigate(data, currentDate.list);
            }}
          />
          <FindEventFilter
            values={filters}
            onChangeHandlers={handlers}
            statusBadges={SwitcherBadges}
            isLoading={isFetching}
          />
        </FlexBlock>
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
