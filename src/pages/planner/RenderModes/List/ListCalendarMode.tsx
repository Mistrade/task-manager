import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';
import { BreadCrumbs } from '@components/BreadCrumbs/BreadCrumbs';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { useEventStorage } from '@hooks/useEventStorage';
import { plannerDateToDate } from '@planner-reducer/utils';
import { EventsStorage, ListCalendarModeProps } from '@planner/planner.types';
import { FindEventFilter } from '@planner/RenderModes/FindEventFilter/FindEventFilter';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate, plannerSelectScope } from '@selectors/planner';
import { MonthList, PLANNER_LAYOUTS } from '@src/common/constants';
import React, { FC } from 'react';
import { ListModeTaskController } from './ListModeTaskController';

export const ListCalendarMode: FC<ListCalendarModeProps> = ({}) => {
  const date = useAppSelector(plannerSelectDate);
  const scope = useAppSelector(plannerSelectScope);
  const { TaskStorage, handlers, filters, isFetching } = useEventStorage();

  return (
    <ScrollVerticalView
      staticContent={
        <FlexBlock direction={'column'}>
          <BreadCrumbs
            data={[
              {
                title: `${date.year}г.`,
                value: PLANNER_LAYOUTS.YEAR,
              },
              {
                title: `${MonthList[date.month]}`,
                value: PLANNER_LAYOUTS.MONTH,
              },
              {
                title: `Неделя ${date.week}`,
                value: PLANNER_LAYOUTS.WEEK,
              },
            ]}
            onClick={(data) => {
              // updateCurrentLayoutAndNavigate(data, currentDate.list);
            }}
          />
          <FindEventFilter
            values={filters}
            onChangeHandlers={handlers}
            isLoading={isFetching}
          />
        </FlexBlock>
      }
      placementStatic={'top'}
      renderPattern={'top-bottom'}
    >
      <ListModeTaskController
        eventStorage={TaskStorage as EventsStorage<ShortEventInfoModel>}
        fromDate={plannerDateToDate(scope.startDate)}
        toDate={plannerDateToDate(scope.endDate)}
      />
    </ScrollVerticalView>
  );
};
