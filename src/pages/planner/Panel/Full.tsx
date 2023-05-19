import React, { FC } from 'react';
import { css, keyframes } from 'styled-components';

import { FlexBlock } from '@components/LayoutComponents';

import { GroupList } from '../Groups';
import { OptionPanelCalendar } from './Calendar';
import { CalendarCurrentTitle } from './CalendarCurrentTitle';
import { CalendarTodaySwitchers } from './CalendarTodaySwitchers';
import { PlannerSelectLayout } from './SelectLayout';

const keyframe = keyframes`
  from {
    max-height: 450px;
    scale: 1;
  }
  
  to {
    scale: .2;
    transform: translateY(-70%);
    opacity: .2;
    max-height: 130px;
  }
`;

const reverseKeyframe = keyframes`
  from {
    max-height: 130px;
    scale: .2;
    transform: translateY(-70%);
    opacity: .2;
  }
  
  to {
    scale: 1;
    max-height: 450px;
  }
`;

const baseAnimation = css`
  animation: ${keyframe} 0.6s ease-in-out forwards;
`;

const reverseAnimation = css`
  animation: ${reverseKeyframe} 0.6s ease-in-out forwards;
  transform: scale(1);
  z-index: 1;
`;

export const FullPanelContent: FC<{ canDestroy: boolean }> = ({
  canDestroy,
}) => {
  return (
    <FlexBlock
      direction={'column'}
      gap={12}
      align={'flex-start'}
      height={'100%'}
      minWidth={'100%'}
    >
      <FlexBlock width={'100%'} justify={'center'}>
        <PlannerSelectLayout pattern={'full'} />
      </FlexBlock>
      <FlexBlock
        width={'100%'}
        direction={'column'}
        height={'fit-content'}
        gap={12}
        additionalCss={canDestroy ? baseAnimation : reverseAnimation}
      >
        <CalendarCurrentTitle pattern={'full'} />
        <FlexBlock
          justify={'flex-start'}
          width={'100%'}
          p={`3px 12px`}
          shrink={0}
        >
          <CalendarTodaySwitchers />
        </FlexBlock>
        <FlexBlock overflow={'hidden'} width={'100%'}>
          <OptionPanelCalendar />
        </FlexBlock>
      </FlexBlock>
      <GroupList />
    </FlexBlock>
  );
};