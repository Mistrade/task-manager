import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { darkColor, disabledColor } from '@src/common/constants';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { LinkStyled } from '@components/Buttons/Link.styled';
import React, { FC } from 'react';
import { useAppSelector } from '@redux/hooks/hooks';
import { CalendarSelectors } from '@selectors/calendarItems';
import { convertEventStatus } from '@src/common/functions';
import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { TaskChainItemProps } from '../event-chains.types';
import { TaskChainBadge } from '../EventChains.styled';

export const TaskChainItem: FC<TaskChainItemProps> = ({
  chainItem,
  eventInfo,
  updateFn,
  suffix,
  withMarginLeft = true,
  bgColor = 'transparent',
  onTitleClick,
}) => {
  const { statuses, planner } = useAppSelector(CalendarSelectors.dataForURL);

  return (
    <FlexBlock
      direction={'row'}
      align={'center'}
      wrap={'nowrap'}
      width={'calc(100% - 12px)'}
      justify={'flex-start'}
      p={'6px'}
      bgColor={bgColor}
      border={`1px solid ${disabledColor}`}
      borderRadius={borderRadiusSize.sm}
      gap={12}
      ml={withMarginLeft ? 12 : undefined}
    >
      <FlexBlock gap={6}>
        {/*<EventIcon status={taskChainItem.status} size={20}/>*/}
        <TaskChainBadge>{convertEventStatus(chainItem.status)}</TaskChainBadge>
        <PriorityCalendarIcon priorityKey={chainItem.priority} size={20} />
      </FlexBlock>
      <LinkStyled
        onClick={onTitleClick}
        style={{ cursor: 'pointer', color: darkColor, fontSize: 16 }}
        target={'_blank'}
        to={`/planner/${planner.layout}/${statuses}/${chainItem._id}`}
      >
        {chainItem.title}
      </LinkStyled>
    </FlexBlock>
  );
};
