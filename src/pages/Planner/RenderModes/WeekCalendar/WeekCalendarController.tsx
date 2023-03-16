import { WeekCalendarProps, WeekItem } from '../../planner.types';
import React, { FC, useMemo } from 'react';
import { WeeKCalendar } from './WeekCalendar';
import dayjs from 'dayjs';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { FindEventFilter } from '../FindEventFilter/FindEventFilter';
import { useEventStorage } from '../../../../hooks/useEventStorage';

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
  const scope = useMemo(
    () => getScope(props.weekItem),
    [props.weekItem.weekOfYear, props.weekItem.month, props.weekItem.year]
  );

  const { handlers, filters, TaskStorage, SwitcherBadges, isFetching } =
    useEventStorage({
      scope,
      layout: props.current.layout,
    });

  return (
    <FlexBlock
      mt={4}
      mb={4}
      height={'100%'}
      width={'100%'}
      direction={'column'}
    >
      <FlexBlock width={'100%'}>
        <FindEventFilter
          statusBadges={SwitcherBadges}
          values={filters}
          onChangeHandlers={handlers}
          isLoading={isFetching}
        />
      </FlexBlock>
      <WeeKCalendar taskStorage={TaskStorage || {}} {...props} />
    </FlexBlock>
  );
};
