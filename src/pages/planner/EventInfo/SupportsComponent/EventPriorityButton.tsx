import { FC, forwardRef, useMemo } from 'react';

import { PRIORITY_TITLES, darkColor } from '@src/common/constants/constants';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { FlexBlock } from '@components/LayoutComponents';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { CalendarPriorityKeys } from '@planner/types';

import { EventToggleButtonProps } from './EventStatusButton';

export interface EventPriorityButtonProps extends EventToggleButtonProps {
  priority: CalendarPriorityKeys | null;
}

export const EventPriorityButton: FC<EventPriorityButtonProps> = forwardRef<
  HTMLButtonElement,
  EventPriorityButtonProps
>((props, ref) => {
  const base = useMemo(() => {
    return (
      <EmptyButtonStyled
        disabled={props.isDisabled}
        ref={ref}
        id={props.buttonId}
        onClick={(e) => props.stopPropagation && e.stopPropagation()}
      >
        <FlexBlock
          gap={6}
          align={'center'}
          fSize={15}
          style={{ color: darkColor }}
        >
          <PriorityCalendarIcon
            {...(props.iconProps || {})}
            priorityKey={props.priority || 'not_selected'}
          />
          {(props.renderText &&
            props.priority &&
            PRIORITY_TITLES[props.priority] + ' приоритет') ||
            ''}
        </FlexBlock>
      </EmptyButtonStyled>
    );
  }, [props]);

  if (props.withTooltipInfo) {
    return (
      <Tooltip
        content={
          props.tooltipInfo && props.tooltipInfo !== 'default'
            ? props.tooltipInfo
            : `Приоритет события: ${
                PRIORITY_TITLES[props.priority || 'not_selected']
              }`
        }
      >
        {base}
      </Tooltip>
    );
  }

  return base;
});
