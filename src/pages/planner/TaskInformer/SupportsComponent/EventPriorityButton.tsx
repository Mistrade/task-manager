import { EventToggleButtonProps } from './EventStatusButton';
import { FC, forwardRef } from 'react';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { darkColor, PRIORITY_TITLES } from '@src/common/constants';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { CalendarPriorityKeys } from '@planner/planner.types';
import { PriorityCalendarIcon } from '@components/Icons/CalendarIcons/PriorityCalendarIcon';
import { Tooltip } from '@components/Tooltip/Tooltip';

export interface EventPriorityButtonProps extends EventToggleButtonProps {
  priority: CalendarPriorityKeys | null;
}

export const EventPriorityButton: FC<EventPriorityButtonProps> = forwardRef<
  HTMLButtonElement,
  EventPriorityButtonProps
>((props, ref) => {
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
      </Tooltip>
    );
  }

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
});
