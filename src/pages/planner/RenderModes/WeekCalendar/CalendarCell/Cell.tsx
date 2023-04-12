import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { plannerDateToDate } from '@planner-reducer/utils';
import { CalendarCellProps } from '@planner/planner.types';
import { borderRadiusSize } from '@src/common/borderRadiusSize';
import {
  currentColor,
  defaultColor,
  disabledColor,
  PLANNER_LAYOUTS,
} from '@src/common/constants';
import { PlannerContext } from '@src/Context/planner.context';
import dayjs from 'dayjs';
import React, { FC, useCallback, useContext } from 'react';
import styled, { css } from 'styled-components';
import { CellDate } from './CellDate';
import { CalendarCellEventsList } from './EventList/List';

export interface CalendarCellStyledComponentProps {
  disabled?: boolean;
  isCurrent?: boolean;
  isHover?: boolean;
  isToday?: boolean;
  isVisible?: boolean;
}

export const CalendarDate = styled('span')<CalendarCellStyledComponentProps>`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 4px;
    background-color: ${(props) =>
      props.isToday ? 'rgba(255,117,66, 1)' : ''};
    color: ${(props) =>
      props.disabled ? disabledColor : props.isToday ? '#fff' : defaultColor};
    transition: all 0.3s ease-in;
  }

  ${(props) => {
    if (props.isHover) {
      return css`
        & {
          color: black;
        }
      `;
    }
  }}
`;

export const WeekCellContainer = styled(
  'div'
)<CalendarCellStyledComponentProps>`
  & {
    position: relative;
    width: 100%;
    height: fit-content;
    display: flex;
    padding: 4px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    border-radius: ${borderRadiusSize.sm};
    box-shadow: none;
    border: 1px solid ${defaultColor};

    ${(_) =>
      'isVisible' in _
        ? !_.isVisible
          ? css`
              display: none;
            `
          : css`
              display: flex;
            `
        : ''}
  }

  ${({ isCurrent, disabled }) => {
    return css`
      ${isCurrent &&
      css`
        & {
          border: 1px solid ${currentColor};
          opacity: 1;
        }
      `}

      ${!disabled &&
      css`
        &:hover {
          cursor: pointer;
          //box-shadow: 0 4px 8px 6px ${disabledColor};
        }
      `}
    `;
  }}

  ${({ disabled }) => {
    if (disabled) {
      return css`
        & {
          border: 1px solid ${disabledColor};
        }
      `;
    }

    return css``;
  }}
`;

export const CalendarCell: FC<CalendarCellProps> = ({
  value,
  tasks = [],
  onSelectTask,
  isVisible,
}) => {
  const { openModal } = useCreateEventModal({ useReturnBackOnDecline: true });
  const {
    methods: { updateCurrentLayoutAndNavigate },
  } = useContext(PlannerContext);

  const onPlusAction = useCallback(() => {
    openModal({
      time: value.value.toString(),
      timeEnd: dayjs(plannerDateToDate(value.value))
        .add(1, 'hour')
        .toDate()
        .toString(),
    });
  }, [value.value, openModal]);

  const onCalendarAction = useCallback(() => {
    updateCurrentLayoutAndNavigate(
      PLANNER_LAYOUTS.DAY,
      plannerDateToDate(value.value)
    );
  }, [updateCurrentLayoutAndNavigate, value.value]);

  return (
    <WeekCellContainer
      isVisible={isVisible}
      disabled={value.meta.isDisabled}
      isCurrent={value.meta.isCurrent}
    >
      <CellDate
        date={value}
        onPlusAction={onPlusAction}
        onCalendarAction={onCalendarAction}
      />
      <CalendarCellEventsList
        tasks={tasks}
        date={value}
        onSelect={onSelectTask}
      />
    </WeekCellContainer>
  );
};
