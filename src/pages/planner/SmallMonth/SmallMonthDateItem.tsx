import { plannerDateToDate } from '@planner-reducer/utils';
import dayjs from 'dayjs';
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
    return (
      <SmallMonthRowItem
        onClick={() => onSelectDate && onSelectDate(date)}
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
