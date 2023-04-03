import { WeekCalendarProps, WeekItem } from '../../planner.types';
import React, { FC, useContext, useMemo } from 'react';
import { WeeKCalendar } from './WeekCalendar';
import dayjs from 'dayjs';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { FindEventFilter } from '../FindEventFilter/FindEventFilter';
import { useEventStorage } from '../../../../hooks/useEventStorage';
import { ScrollVerticalView } from '../../../../components/LayoutComponents/ScrollView/ScrollVerticalView';
import { BreadCrumbs } from '../../../../components/BreadCrumbs/BreadCrumbs';
import { MonthList, PLANNER_LAYOUTS } from '../../../../common/constants';
import { PlannerContext } from '../../../../Context/planner.context';

export interface WeekCalendarControllerProps
  extends Omit<WeekCalendarProps, 'taskStorage'> {}

interface Scope {
  start: Date;
  end: Date;
}

function getScope(weekItem: WeekItem): Scope {
  const start = dayjs(weekItem.days[0].value).startOf('date');
  const end = dayjs(weekItem.days[weekItem.days.length - 1].value).endOf(
    'date'
  );

  return {
    start: start.toDate(),
    end: end.toDate(),
  };
}

export const WeekCalendarController: FC<WeekCalendarControllerProps> = (
  props
) => {
  const {
    currentDate,
    methods: { updateCurrentLayoutAndNavigate },
  } = useContext(PlannerContext);

  const scope = useMemo(
    () => getScope(props.weekItem),
    [props.weekItem.weekOfYear, props.weekItem.month, props.weekItem.year]
  );

  const { handlers, filters, TaskStorage, SwitcherBadges, isFetching } =
    useEventStorage({
      scope,
      layout: PLANNER_LAYOUTS.WEEK,
    });

  return (
    <ScrollVerticalView
      staticContent={
        <FlexBlock direction={'column'}>
          <BreadCrumbs
            data={[
              {
                title: `${currentDate.week.getFullYear()}г.`,
                value: PLANNER_LAYOUTS.YEAR,
              },
              {
                title: `${MonthList[currentDate.week.getMonth()]}`,
                value: PLANNER_LAYOUTS.MONTH,
              },
            ]}
            onClick={(data) => {
              updateCurrentLayoutAndNavigate(data, currentDate.week);
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
      containerProps={{ pt: 4, pb: 4, mt: 6 }}
      renderPattern={'top-bottom'}
    >
      <WeeKCalendar taskStorage={TaskStorage || {}} {...props} />
    </ScrollVerticalView>
  );
};
