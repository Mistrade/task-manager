import { GetEventsSchemeResponse } from '@api/planning-api/types/event-info.types';
import { plannerDateToDate } from '@planner-reducer/utils';
import { CalendarItem, PlannerMonthMode } from '@planner/planner.types';
import { addNull } from '@src/common/functions';
import dayjs from 'dayjs';
import { FC } from 'react';
import { SmallMonthRowItem } from './SmallMonth.styled';
import {
  CheckPourMonthResult,
  SmallMonthWeekItemProps,
} from './SmallMonthWeekItem';

interface SmallMonthDateItemProps {
  date: CalendarItem;
  currentDate?: Date;
  taskScheme?: GetEventsSchemeResponse;
  pour: CheckPourMonthResult | null;
  onSelectDate?: SmallMonthWeekItemProps['onSelectDate'];
  isSelect?: boolean;
  current: PlannerMonthMode;
}

export const SmallMonthDateItem: FC<SmallMonthDateItemProps> = ({
  date,
  currentDate,
  pour,
  taskScheme,
  onSelectDate,
  isSelect,
  current,
}) => {
  return (
    <SmallMonthRowItem
      onClick={() => onSelectDate && onSelectDate(date)}
      isFirstPoured={
        pour?.firstPour &&
        dayjs(plannerDateToDate(date.value)).isSame(pour?.firstPour, 'day')
      }
      isPoured={
        pour?.firstPour &&
        pour?.lastPour &&
        dayjs(plannerDateToDate(date.value)).isBetween(
          pour?.firstPour,
          pour?.lastPour,
          'day',
          '()'
        )
      }
      isLastPoured={
        pour?.lastPour &&
        dayjs(plannerDateToDate(date.value)).isSame(pour?.lastPour, 'day')
      }
      isDisabled={date.value.month !== current.month}
      isToday={date.meta.isToday}
      isSelect={isSelect}
      hasTasks={
        current.month === date.value.month &&
        taskScheme &&
        !!taskScheme[dayjs(plannerDateToDate(date.value)).format('DD-MM-YYYY')]
      }
    >
      {addNull(date.value.day)}
    </SmallMonthRowItem>
  );
};
