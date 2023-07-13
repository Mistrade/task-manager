import {
  Arrow,
  BurgerIcon,
  CompleteIcon,
  DoubleArrow,
  IconProps,
  SadSmile,
} from '@components/Icons/Icons';
import { FlexBlockProps } from '@components/LayoutComponents/FlexBlock';
import { CalendarPriorityKeys } from '@planner/types';
import { priorityColors } from '@src/common/constants/constants';
import { kitColors } from 'chernikov-kit';
import React, { FC } from 'react';


interface PriorityCalendarIconProps extends IconProps, FlexBlockProps {
  priorityKey: CalendarPriorityKeys;
  isCompleted?: boolean;
}

export const PriorityCalendarIcon: FC<PriorityCalendarIconProps> = ({
  priorityKey,
  isCompleted,
  ...props
}) => {
  if (isCompleted) {
    return <CompleteIcon size={20} {...props} />;
  }

  switch (priorityKey) {
    case 'veryHigh':
      return (
        <DoubleArrow
          size={20}
          color={priorityColors.veryHigh}
          {...props}
          transform={'rotate(-90deg)'}
        />
      );
    case 'high':
      return (
        <Arrow
          size={20}
          color={priorityColors.high}
          {...props}
          transform={'rotate(-90deg)'}
        />
      );
    case 'medium':
      return <BurgerIcon size={20} {...props} />;
    case 'low':
      return (
        <Arrow
          size={20}
          color={priorityColors.low}
          {...props}
          transform={'rotate(90deg)'}
        />
      );
    case 'veryLow':
      return (
        <DoubleArrow
          size={20}
          color={priorityColors.veryLow}
          {...props}
          transform={'rotate(90deg)'}
        />
      );
    case 'not_selected':
      return <SadSmile size={20} color={kitColors.primary} {...props} />;
  }

  return <></>;
};