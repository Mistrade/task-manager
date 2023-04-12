import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { CalendarModeSwitchers } from '@planner/Header/ModeSwitch/List';
import { CalendarHeaderProps } from '@planner/planner.types';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { FC } from 'react';
import { CalendarHeaderContainer } from './CalendarHeader.styled';

export const PlannerHeader: FC<CalendarHeaderProps> = React.memo(() => {
  return (
    <CalendarHeaderContainer>
      <FlexBlock width={'100%'} justify={'space-between'}>
        <FlexBlock justify={'flex-start'} gap={6}>
          <FlexBlock justify={'flex-start'}>
            <CalendarModeSwitchers />
          </FlexBlock>
        </FlexBlock>
      </FlexBlock>
    </CalendarHeaderContainer>
  );
}, disableReRender);
