import {
  PLANNER_LAYOUTS,
  SERVICES_NAMES,
} from '../../../../../../common/constants/enums';
import { getPath } from '../../../../../../common/functions';
import { CellDateHoverContainer } from './Cell.styled';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { CalendarIcon } from '@components/Icons/AppIcon/CalendarIcon';
import { PlusIcon } from '@components/Icons/Icons';
import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setPlannerDateAndLayout } from '@planner-reducer/index';
import { IPlannerDate } from '@planner-reducer/types';
import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppDispatch } from '@redux/hooks/hooks';
import { kitColors } from 'chernikov-kit';
import dayjs from 'dayjs';
import React, { memo } from 'react';


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
          <CalendarIcon size={30} color={kitColors.primary} />
        </EmptyButtonStyled>
        <EmptyButtonStyled onClick={onPlusAction}>
          <PlusIcon size={30} color={kitColors.primary} />
        </EmptyButtonStyled>
      </CellDateHoverContainer>
    );
  },
  (prev, next) => prev.date.day === next.date.day
);