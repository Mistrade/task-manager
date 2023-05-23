import { plannerDateToDate } from '@planner-reducer/utils';
import dayjs from 'dayjs';
import React, { memo, useState } from 'react';

import { StyledBadge } from '@components/Badge/styled';
import { FlexBlock } from '@components/LayoutComponents';

import {
  MonthList,
  WeekDaysShortList,
} from '../../../../../../common/constants/constants';
import { addNull } from '../../../../../../common/functions';
import { CalendarItem } from '../../../../types';
import { CalendarDate, CellDateStyledContainer } from './Cell.styled';
import { CellDateButtons } from './CellDateButtons';

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
            <StyledBadge>
              {
                WeekDaysShortList[
                  dayjs(plannerDateToDate(date.value)).weekday()
                ]
              }
            </StyledBadge>
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
