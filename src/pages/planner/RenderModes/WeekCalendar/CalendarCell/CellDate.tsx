import { CellDateHoverContainer, CellDateStyledContainer } from './Cell.styled';
import React, { FC, useState } from 'react';
import { Badge } from '@components/Badge/Badge';
import {
  currentColor,
  MonthList,
  WeekDaysShortList,
} from '@src/common/constants';
import dayjs from 'dayjs';
import { CalendarDate } from './Cell';
import { CalendarItem } from '@planner/planner.types';
import { addNull } from '@src/common/functions';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PlusIcon } from '@components/Icons/Icons';
import { CalendarIcon } from '@components/Icons/AppIcon/CalendarIcon';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

export interface CellDateProps {
  date: CalendarItem;
  onPlusAction?: () => void;
  onCalendarAction?: () => void;
  useHoverNavigation?: boolean;
  renderMonth?: boolean;
}

export const CellDate: FC<CellDateProps> = ({
  date,
  onPlusAction,
  onCalendarAction,
  useHoverNavigation = true,
  renderMonth = false,
}) => {
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
        <CellDateHoverContainer>
          <EmptyButtonStyled onClick={onCalendarAction}>
            <CalendarIcon size={30} color={currentColor} />
          </EmptyButtonStyled>
          <EmptyButtonStyled onClick={onPlusAction}>
            <PlusIcon size={30} color={currentColor} />
          </EmptyButtonStyled>
        </CellDateHoverContainer>
      ) : (
        <>
          <FlexBlock grow={3} pl={4}>
            {renderMonth && MonthList[date.value.getMonth()]}
          </FlexBlock>
          <Badge>{WeekDaysShortList[dayjs(date.value).weekday()]}</Badge>
          <CalendarDate
            isToday={date.meta.isToday}
            disabled={date.meta.isDisabled}
            isCurrent={date.meta.isCurrent}
          >
            {addNull(dayjs(date.value).date())}
          </CalendarDate>
        </>
      )}
    </CellDateStyledContainer>
  );
};
