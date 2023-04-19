import { plannerDateToDate } from '@planner-reducer/utils';
import dayjs from 'dayjs';
import { FC } from 'react';

import { addNull } from '@src/common/functions';

import { SmallMonthProps } from '@planner/SmallMotnCalendar/SmallMonth';
import { CalendarItem, PlannerMonthMode } from '@planner/planner.types';

import { GetEventsSchemeResponse } from '@api/planning-api/types/event-info.types';

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
  dateComponent?: SmallMonthProps['dateComponent'];
}

export const SmallMonthDateItem: FC<SmallMonthDateItemProps> = ({
  date,
  currentDate,
  pour,
  taskScheme,
  onSelectDate,
  isSelect,
  current,
  dateComponent,
}) => {
  if (!dateComponent) {
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
          !!taskScheme[
            dayjs(plannerDateToDate(date.value)).format('DD-MM-YYYY')
          ]
        }
      >
        {addNull(date.value.day)}
      </SmallMonthRowItem>
    );
  }

  return (
    <>
      {dateComponent({
        date,
        taskScheme,
        onSelectDate,
        current,
      })}
    </>
  );
};
