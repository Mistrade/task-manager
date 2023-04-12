import { useEventStorage } from '@hooks/useEventStorage';
import dayjs from 'dayjs';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { FindEventFilter } from '@planner/RenderModes/FindEventFilter/FindEventFilter';
import { ListModeTaskController } from '@planner/RenderModes/List/ListModeTaskController';
import React, { FC, useContext, useMemo } from 'react';
import { EventsStorage, FavoritesCalendarModeProps } from '@planner/planner.types';
import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';
import { MonthList, PLANNER_LAYOUTS } from '@src/common/constants';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';
import { PlannerContext } from '@src/Context/planner.context';

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

  const {
    TaskStorage,
    SwitcherBadges,
    handlers,
    filters,
    debounceValue,
    isFetching,
  } = useEventStorage({
    layout: PLANNER_LAYOUTS.FAVORITES,
    scope: {
      start: startDate,
      end: toDate,
    },
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
              updateCurrentLayoutAndNavigate(data, currentDate.favorites);
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
    >
      <ListModeTaskController
        eventStorage={TaskStorage as EventsStorage<ShortEventInfoModel>}
        fromDate={startDate}
        toDate={toDate}
      />
    </ScrollVerticalView>
  );
};
