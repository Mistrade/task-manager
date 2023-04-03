import { FC } from 'react';
import { CalendarHeaderProps } from '../planner.types';
import { FlexBlock } from '../../../components/LayoutComponents/FlexBlock';
import { CalendarModeSwitchers } from './CalendarModeSwitchers';
import { CalendarHeaderContainer } from './CalendarHeader.styled';

export const PlannerHeader: FC<CalendarHeaderProps> = ({}) => {
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
};
