import { CalendarItem, PlannerMonthMode } from '../planner.types';
import {
  CheckPourMonthResult,
  SmallMonthWeekItemProps,
} from './SmallMonthWeekItem';
import { FC } from 'react';
import dayjs from 'dayjs';
import { addNull } from '../../../common/functions';
import { SmallMonthRowItem } from './SmallMonth.styled';
import { GetEventsSchemeResponse } from '../../../store/api/planning-api/types/event-info.types';

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
        pour?.firstPour && dayjs(date.value).isSame(pour?.firstPour, 'day')
      }
      isPoured={
        pour?.firstPour &&
        pour?.lastPour &&
        dayjs(date.value).isBetween(
          pour?.firstPour,
          pour?.lastPour,
          'day',
          '()'
        )
      }
      isLastPoured={
        pour?.lastPour && dayjs(date.value).isSame(pour?.lastPour, 'day')
      }
      isDisabled={date.value.getMonth() !== current.month}
      isToday={date.meta.isToday}
      isSelect={isSelect}
      hasTasks={
        current.month === date.value.getMonth() &&
        taskScheme &&
        !!taskScheme[dayjs(date.value).format('DD-MM-YYYY')]
      }
    >
      {addNull(dayjs(date.value).date())}
    </SmallMonthRowItem>
  );
};
