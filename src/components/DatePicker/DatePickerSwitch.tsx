import React, { FC, ReactNode } from 'react';

import { ShortChangeCurrentPattern } from '@src/common/commonTypes';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { Arrow, DoubleArrow } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';

import { SwitchCalendarMode } from '@planner/styled';


const SwitchArr: Array<{
  title: ReactNode;
  pattern: ShortChangeCurrentPattern;
}> = [
  {
    title: <DoubleArrow size={16} transform={'rotate(180deg)'} />,
    pattern: '--',
  },
  {
    title: <Arrow size={16} transform={'rotate(180deg)'} />,
    pattern: '-',
  },
  {
    title: 'Сегодня',
    pattern: 'today',
  },
  {
    title: <Arrow size={16} />,
    pattern: '+',
  },
  {
    title: <DoubleArrow size={16} />,
    pattern: '++',
  },
];

export interface DatePickerSwitchProps {
  onClick(pattern: ShortChangeCurrentPattern): void;
}

export const DatePickerSwitch: FC<DatePickerSwitchProps> = ({ onClick }) => {
  return (
    <FlexBlock width={'100%'} justify={'center'} align={'center'} gap={2}>
      {SwitchArr.map((item) => {
        if (item.pattern === 'today') {
          return (
            <SwitchCalendarMode
              key={item.pattern}
              style={{ background: 'transparent' }}
              type={'button'}
              onClick={() => onClick(item.pattern)}
            >
              Сегодня
            </SwitchCalendarMode>
          );
        }

        return (
          <EmptyButtonStyled
            key={item.pattern}
            style={{ padding: '4px' }}
            onClick={() => onClick(item.pattern)}
          >
            {item.title}
          </EmptyButtonStyled>
        );
      })}
    </FlexBlock>
  );
};