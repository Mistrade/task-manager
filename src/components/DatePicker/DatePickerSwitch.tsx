import React, { FC, ReactNode } from 'react';

import { ShortChangeCurrentPattern } from '@src/common/commonTypes';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { Arrow, DoubleArrow } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';

import { SwitchCalendarMode } from '@planner/styled';

import { currentColor } from '../../common/constants/constants';

const SwitchArr: Array<{
  title: ReactNode;
  pattern: ShortChangeCurrentPattern;
}> = [
  {
    title: (
      <DoubleArrow
        size={20}
        transform={'rotate(180deg)'}
        color={currentColor}
      />
    ),
    pattern: '--',
  },
  {
    title: (
      <Arrow size={20} transform={'rotate(180deg)'} color={currentColor} />
    ),
    pattern: '-',
  },
  {
    title: 'Сегодня',
    pattern: 'today',
  },
  {
    title: <Arrow size={20} color={currentColor} />,
    pattern: '+',
  },
  {
    title: <DoubleArrow size={20} color={currentColor} />,
    pattern: '++',
  },
];

export interface DatePickerSwitchProps {
  onClick(pattern: ShortChangeCurrentPattern): void;
}

export const DatePickerSwitch: FC<DatePickerSwitchProps> = ({ onClick }) => {
  return (
    <FlexBlock
      width={'100%'}
      justify={'center'}
      align={'center'}
      gap={2}
      overflow={'hidden'}
    >
      {SwitchArr.map((item) => {
        if (item.pattern === 'today') {
          return (
            <SwitchCalendarMode
              key={item.pattern}
              style={{ background: 'transparent', flexShrink: 0 }}
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
