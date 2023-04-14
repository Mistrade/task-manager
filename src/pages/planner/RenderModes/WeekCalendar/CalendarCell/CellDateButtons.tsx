import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { CalendarIcon } from '@components/Icons/AppIcon/CalendarIcon';
import { PlusIcon } from '@components/Icons/Icons';
import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { IPlannerDate } from '@planner-reducer/types';
import { plannerDateToDate } from '@planner-reducer/utils';
import { CellDateHoverContainer } from '@planner/RenderModes/WeekCalendar/CalendarCell/Cell.styled';
import { useAppDispatch } from '@redux/hooks/hooks';
import { currentColor, PLANNER_LAYOUTS } from '@src/common/constants';
import dayjs from 'dayjs';
import React, { memo } from 'react';

export const CellDateButtons = memo<{ date: IPlannerDate }>(
  ({ date }) => {
    const dispatch = useAppDispatch();
    const { openModal } = useCreateEventModal({ useReturnBackOnDecline: true });
    const onPlusAction = () => {
      openModal({
        time: plannerDateToDate(date).toString(),
        timeEnd: dayjs(plannerDateToDate(date))
          .add(1, 'hour')
          .toDate()
          .toString(),
      });
    };

    const onCalendarAction = () => {
      dispatch(
        setPlannerDateAndLayout({
          layout: PLANNER_LAYOUTS.DAY,
          date,
        })
      );
    };

    return (
      <CellDateHoverContainer>
        <EmptyButtonStyled onClick={onCalendarAction}>
          <CalendarIcon size={30} color={currentColor} />
        </EmptyButtonStyled>
        <EmptyButtonStyled onClick={onPlusAction}>
          <PlusIcon size={30} color={currentColor} />
        </EmptyButtonStyled>
      </CellDateHoverContainer>
    );
  },
  (prev, next) => prev.date.day === next.date.day
);
