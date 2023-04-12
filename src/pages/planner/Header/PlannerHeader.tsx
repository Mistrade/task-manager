import React, { FC } from 'react';
import { CalendarHeaderProps } from '@planner/planner.types';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { CalendarModeSwitchers } from './CalendarModeSwitchers';
import { CalendarHeaderContainer } from './CalendarHeader.styled';
import { disableReRender } from '@src/common/utils/react-utils';

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
