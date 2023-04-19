import { plannerDateToDate } from '@planner-reducer/utils';
import dayjs from 'dayjs';
import React, { memo, useState } from 'react';

import { MonthList, WeekDaysShortList } from '@src/common/constants/constants';
import { addNull } from '@src/common/functions';

import { Badge } from '@components/Badge/Badge';
import { FlexBlock } from '@components/LayoutComponents';

import { CellDateButtons } from '@planner/RenderModes/WeekCalendar/CalendarCell/CellDateButtons';
import { CalendarItem } from '@planner/planner.types';

import { CalendarDate } from './Cell';
import { CellDateStyledContainer } from './Cell.styled';


export interface CellDateProps {
  date: CalendarItem;
  useHoverNavigation?: boolean;
  renderMonth?: boolean;
}

export const CellDate = memo<CellDateProps>(
  ({ date, useHoverNavigation = true, renderMonth = false }) => {
    const [isHover, setIsHover] = useState(false);
    const [timeout, setTimeoutState] = useState<any>();

    return (
      <CellDateStyledContainer
        onMouseEnter={() => {
          if (useHoverNavigation) {
            clearTimeout(timeout);
            setTimeoutState(
              setTimeout(() => {
                setIsHover(true);
              }, 1000)
            );
          }
        }}
        onMouseLeave={() => {
          if (useHoverNavigation) {
            clearTimeout(timeout);
            setIsHover(false);
          }
        }}
      >
        {useHoverNavigation && isHover ? (
          <CellDateButtons date={date.value} />
        ) : (
          <>
            <FlexBlock grow={3} pl={4}>
              {renderMonth && MonthList[date.value.month]}
            </FlexBlock>
            <Badge>
              {
                WeekDaysShortList[
                  dayjs(plannerDateToDate(date.value)).weekday()
                ]
              }
            </Badge>
            <CalendarDate
              isToday={date.meta.isToday}
              disabled={date.meta.isDisabled}
              isCurrent={date.meta.isCurrent}
            >
              {addNull(date.value.day)}
            </CalendarDate>
          </>
        )}
      </CellDateStyledContainer>
    );
  },
  (prev, next) => prev.date.value.day === next.date.value.day
);