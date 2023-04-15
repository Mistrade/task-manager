import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { CalendarIcon } from '@components/Icons/AppIcon/CalendarIcon';
import { PlusIcon } from '@components/Icons/Icons';
import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { IPlannerDate } from '@planner-reducer/types';
import { plannerDateToDate } from '@planner-reducer/utils';
import { CellDateHoverContainer } from '@planner/RenderModes/WeekCalendar/CalendarCell/Cell.styled';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { ServicesNames } from '@redux/reducers/global';
import { plannerSelectStatus } from '@selectors/planner';
import { currentColor, PLANNER_LAYOUTS } from '@src/common/constants';
import { getPath } from '@src/common/functions';
import dayjs from 'dayjs';
import React, { memo } from 'react';

export const CellDateButtons = memo<{ date: IPlannerDate }>(
  ({ date }) => {
    const dispatch = useAppDispatch();
    const navigate = useSearchNavigate();
    const status = useAppSelector(plannerSelectStatus);
    const { openModal } = useCreateEventModal();

    const onPlusAction = () => {
      openModal(
        {
          time: plannerDateToDate(date).toString(),
          timeEnd: dayjs(plannerDateToDate(date))
            .add(1, 'hour')
            .toDate()
            .toString(),
        },
        {
          useReturnBackOnDecline: true,
          modalPath: 'event/create',
        }
      );
    };

    const onCalendarAction = () => {
      dispatch(
        setPlannerDateAndLayout({
          layout: PLANNER_LAYOUTS.DAY,
          date,
        })
      );

      navigate(getPath(ServicesNames.PLANNER, PLANNER_LAYOUTS.DAY, status));
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
