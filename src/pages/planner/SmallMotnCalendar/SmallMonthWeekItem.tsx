import { plannerDateToDate } from '@planner-reducer/utils';
import dayjs from 'dayjs';
import { FC, useCallback, useMemo } from 'react';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents';

import { PlannerMonthMode, WeekItem } from '@planner/planner.types';

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

const checkIsPouredWeek = (weekItem: WeekItem, pourDate: PourDatesProps) => {
  const date = dayjs(pourDate.date);
  return date.week() === weekItem.weekOfYear && date.year() === weekItem.year;
};

export interface CheckPourMonthResult {
  firstPour: Date;
  lastPour: Date;
}

const checkPourMonth = (
  pourDate: PourDatesProps
): CheckPourMonthResult | null => {
  if (pourDate.type === 'month') {
    const date = dayjs(pourDate.date);

    return {
      firstPour: date.startOf('month').toDate(),
      lastPour: date.endOf('month').toDate(),
    };
  }

  return null;
};

const arr = [1, 2, 3, 4, 5, 6, 7];

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
  const weekIsPoured = useMemo(() => {
    return pourDates?.type === 'week' && checkIsPouredWeek(weekItem, pourDates);
  }, [weekItem, pourDates]);

  const selectWeekHandle = useCallback(() => {
    onSelectWeek &&
      onSelectWeek({
        layout: 'week',
        aroundDate: plannerDateToDate(weekItem.days[0].value),
      });
  }, [weekItem, onSelectWeek]);

  return (
    <SmallMonthRow isPoured={weekIsPoured}>
      <SmallMonthWeekCount>
        <EmptyButtonStyled onClick={selectWeekHandle}>
          {weekItem.weekOfYear}
        </EmptyButtonStyled>
      </SmallMonthWeekCount>
      <FlexBlock
        justify={
          dayjs(plannerDateToDate(weekItem.days[0].value)).weekday() > 0
            ? 'flex-end'
            : 'flex-start'
        }
        align={'center'}
        width={'100%'}
        gap={4}
      >
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
              pour={
                pourDates?.type === 'month' ? checkPourMonth(pourDates) : null
              }
              isSelect={isSelect}
            />
          );
        })}
      </FlexBlock>
    </SmallMonthRow>
  );
};