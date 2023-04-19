import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { IPlannerDate } from '@planner-reducer/types';
import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppDispatch } from '@redux/hooks/hooks';
import dayjs from 'dayjs';
import React, { memo } from 'react';

import { currentColor } from '@src/common/constants/constants';
import { PLANNER_LAYOUTS, SERVICES_NAMES } from '@src/common/constants/enums';
import { getPath } from '@src/common/functions';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { CalendarIcon } from '@components/Icons/AppIcon/CalendarIcon';
import { PlusIcon } from '@components/Icons/Icons';

import { CellDateHoverContainer } from '@planner/Modes/Week/CalendarCell/Cell.styled';

export const CellDateButtons = memo<{ date: IPlannerDate }>(
  ({ date }) => {
    const dispatch = useAppDispatch();
    const navigate = useSearchNavigate();
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

      navigate(getPath(SERVICES_NAMES.PLANNER, PLANNER_LAYOUTS.DAY));
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
