import { plannerDateToDate } from '@planner-reducer/utils';
import dayjs from 'dayjs';
import { FC, useCallback, useMemo } from 'react';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents';

import { PlannerMonthMode, WeekItem } from '@planner/types';

import { GetEventsSchemeResponse } from '@api/planning-api/types/event-info.types';

import { PourDatesProps, SmallMonthProps } from './SmallMonth';
import { SmallMonthRow, SmallMonthWeekCount } from './SmallMonth.styled';
import { SmallMonthDateItem } from './SmallMonthDateItem';

export interface SmallMonthWeekItemProps
  extends Pick<
    SmallMonthProps,
    'onSelectWeek' | 'onSelectDate' | 'useTooltips' | 'dateComponent'
  > {
  current: PlannerMonthMode;
  pourDates?: PourDatesProps;
  weekItem: WeekItem;
  currentDate?: Date;
  taskScheme?: GetEventsSchemeResponse;
}

export const SmallMonthWeekItem: FC<SmallMonthWeekItemProps> = ({
  pourDates,
  weekItem,
  currentDate,
  taskScheme,
  onSelectWeek,
  onSelectDate,
  useTooltips,
  current,
  dateComponent,
}) => {
  const selectWeekHandle = useCallback(() => {
    onSelectWeek &&
      onSelectWeek({
        layout: 'week',
        aroundDate: plannerDateToDate(weekItem.days[0].value),
      });
  }, [weekItem, onSelectWeek]);

  const justify = useMemo(() => {
    return dayjs(plannerDateToDate(weekItem.days[0].value)).weekday() > 0
      ? 'flex-end'
      : 'flex-start';
  }, [weekItem.days]);

  return (
    <SmallMonthRow>
      <SmallMonthWeekCount>
        <EmptyButtonStyled onClick={selectWeekHandle}>
          {weekItem.weekOfYear}
        </EmptyButtonStyled>
      </SmallMonthWeekCount>
      <FlexBlock justify={justify} align={'center'} width={'100%'} gap={4}>
        {weekItem.days.map((day, index) => {
          const date = plannerDateToDate(day.value);
          const isSelect =
            currentDate && dayjs(currentDate).isSame(date, 'date');

          return (
            <SmallMonthDateItem
              dateComponent={dateComponent}
              current={current}
              key={`short-date-${day.value.day}`}
              date={day}
              currentDate={currentDate}
              taskScheme={taskScheme}
              onSelectDate={onSelectDate}
              isSelect={isSelect}
            />
          );
        })}
      </FlexBlock>
    </SmallMonthRow>
  );
};
