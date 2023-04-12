import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';
import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { useEventStorage } from '@hooks/useEventStorage';
import {
  EventsStorage,
  FavoritesCalendarModeProps,
} from '@planner/planner.types';
import { FindEventFilter } from '@planner/RenderModes/FindEventFilter/FindEventFilter';
import { ListModeTaskController } from '@planner/RenderModes/List/ListModeTaskController';
import { MonthList, PLANNER_LAYOUTS } from '@src/common/constants';
import { PlannerContext } from '@src/Context/planner.context';
import dayjs from 'dayjs';
import React, { FC, useContext, useMemo } from 'react';

export const FavoritesCalendar: FC<FavoritesCalendarModeProps> = ({}) => {
  const {
    currentDate,
    methods: { updateCurrentLayoutAndNavigate },
  } = useContext(PlannerContext);

  const startDate = useMemo(() => {
    return new Date(2022, 0, 1);
  }, []);

  const toDate = useMemo(() => {
    return dayjs()
      .set('year', new Date().getFullYear() + 1)
      .endOf('year')
      .toDate();
  }, []);

  const { TaskStorage, handlers, filters, isFetching } = useEventStorage({
    onlyFavorites: true,
  });

  return (
    <ScrollVerticalView
      renderPattern={'top-bottom'}
      placementStatic={'top'}
      staticContent={
        <FlexBlock direction={'column'}>
          <BreadCrumbs
            data={[
              {
                title: `${currentDate.favorites.getFullYear()}г.`,
                value: PLANNER_LAYOUTS.YEAR,
              },
              {
                title: `${MonthList[currentDate.favorites.getMonth()]}`,
                value: PLANNER_LAYOUTS.MONTH,
              },
              {
                title: `Неделя ${dayjs(currentDate.favorites).week()}`,
                value: PLANNER_LAYOUTS.WEEK,
              },
            ]}
            onClick={(data) => {
              // updateCurrentLayoutAndNavigate(data, currentDate.favorites);
            }}
          />
          <FindEventFilter
            values={filters}
            onChangeHandlers={handlers}
            isLoading={isFetching}
          />
        </FlexBlock>
      }
    >
      <ListModeTaskController
        eventStorage={TaskStorage as EventsStorage<ShortEventInfoModel>}
        fromDate={startDate}
        toDate={toDate}
      />
    </ScrollVerticalView>
  );
};
