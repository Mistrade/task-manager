import { FC } from 'react';

import { addNull } from '@src/common/functions';

import { SmallMonthProps } from '@planner/SmallMonth/SmallMonth';
import { CalendarItem, PlannerMonthMode } from '@planner/types';

import { GetEventsSchemeResponse } from '@api/planning-api/types/event-info.types';

import { SmallMonthRowItem } from './SmallMonth.styled';
import { SmallMonthWeekItemProps } from './SmallMonthWeekItem';

interface SmallMonthDateItemProps {
  date: CalendarItem;
  currentDate?: Date;
  taskScheme?: GetEventsSchemeResponse;
  onSelectDate?: SmallMonthWeekItemProps['onSelectDate'];
  isSelect?: boolean;
  current: PlannerMonthMode;
  dateComponent?: SmallMonthProps['dateComponent'];
}

export const SmallMonthDateItem: FC<SmallMonthDateItemProps> = ({
  date,
  currentDate,
  taskScheme,
  onSelectDate,
  isSelect,
  current,
  dateComponent,
}) => {
  if (!dateComponent) {
    const isDisabled = date.meta.isDisabled;
    return (
      <SmallMonthRowItem
        onClick={() => !isDisabled && onSelectDate && onSelectDate(date)}
        isDisabled={isDisabled || current.month !== date.value.month}
        isToday={date.meta.isToday}
        isSelect={isSelect}
        hasTasks={
          !isDisabled &&
          current.month === date.value.month &&
          taskScheme &&
          !!taskScheme[
            `${addNull(date.value.day)}-${addNull(date.value.month + 1)}-${
              date.value.year
            }`
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
