import React, { FC } from 'react';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Arrow, DoubleArrow } from '@components/Icons/Icons';
import { SwitchCalendarMode } from '@planner/Planner.styled';
import { CalendarTodaySwitchersProps } from '@planner/planner.types';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';

export const CalendarTodaySwitchers: FC<CalendarTodaySwitchersProps> =
  React.memo(
    ({ currentLayout, onChangeSwitcherState }) => {
      return (
        <FlexBlock width={'100%'} justify={'center'} align={'center'} gap={2}>
          <EmptyButtonStyled
            style={{ padding: '4px' }}
            onClick={() => onChangeSwitcherState('--', currentLayout)}
          >
            <DoubleArrow size={16} transform={'rotate(180deg)'} />
          </EmptyButtonStyled>
          <EmptyButtonStyled
            style={{ padding: '4px' }}
            onClick={() => onChangeSwitcherState('-', currentLayout)}
          >
            <Arrow size={16} transform={'rotate(180deg)'} />
          </EmptyButtonStyled>
          <SwitchCalendarMode
            style={{ background: 'transparent' }}
            type={'button'}
            onClick={() => onChangeSwitcherState('today', currentLayout)}
          >
            Сегодня
          </SwitchCalendarMode>
          <EmptyButtonStyled
            style={{ padding: '4px' }}
            onClick={() => onChangeSwitcherState('+', currentLayout)}
          >
            <Arrow size={16} />
          </EmptyButtonStyled>
          <EmptyButtonStyled
            style={{ padding: '4px' }}
            onClick={() => onChangeSwitcherState('++', currentLayout)}
          >
            <DoubleArrow size={16} />
          </EmptyButtonStyled>
        </FlexBlock>
      );
    },
    (prevProps, nextProps) =>
      prevProps.currentLayout === nextProps.currentLayout
  );
