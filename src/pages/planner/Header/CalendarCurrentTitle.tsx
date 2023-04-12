import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { borderRadiusSize, disabledColor } from '@src/common/constants';
import {
  CalendarHeaderAddButton,
  CalendarHeaderAddButtonProps,
} from './CalendarHeaderAddButton';
import React, { FC } from 'react';
import { CalendarTodaySwitchers } from './CalendarTodaySwitchers';
import { CalendarTitle } from '@planner/Planner.styled';
import { CalendarTodaySwitchersProps } from '@planner/planner.types';

export interface CalendarCurrentTitleProps
  extends CalendarTodaySwitchersProps,
    CalendarHeaderAddButtonProps {
  title: string;
}

export const CalendarCurrentTitle: FC<CalendarCurrentTitleProps> = ({
  title,
  // current,
  statuses,
  onAddTask,
  onChangeSwitcherState,
  currentLayout,
}) => {
  return (
    <FlexBlock
      direction={'column'}
      gap={4}
      border={`1px solid ${disabledColor}`}
      width={'100%'}
      borderRadius={borderRadiusSize.sm}
      pt={6}
      pb={6}
    >
      <FlexBlock justify={'center'} width={'100%'} p={`3px 12px`}>
        <CalendarHeaderAddButton
          // current={current}
          currentLayout={currentLayout}
          statuses={statuses}
          onAddTask={onAddTask}
        />
      </FlexBlock>
      <FlexBlock justify={'center'} width={'100%'} p={`3px 12px`} fSize={20}>
        <CalendarTitle>{title}</CalendarTitle>
      </FlexBlock>
      <FlexBlock justify={'center'} width={'100%'} p={`3px 12px`}>
        <CalendarTodaySwitchers
          currentLayout={currentLayout}
          onChangeSwitcherState={onChangeSwitcherState}
        />
      </FlexBlock>
    </FlexBlock>
  );
};
