import { plannerDateToDate } from '@planner-reducer/utils';
import dayjs from 'dayjs';
import { FC, useCallback, useMemo } from 'react';
import styled, { CSSProperties } from 'styled-components';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';

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

const DaysContainer = styled('div')<{
  justify: CSSProperties['justifyContent'];
}>`
  display: flex;
  justify-content: ${(_) => _.justify};
  align-items: center;
  width: 100%;
  gap: 4px;
`;

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
      <DaysContainer justify={justify}>
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
      </DaysContainer>
    </SmallMonthRow>
  );
};
