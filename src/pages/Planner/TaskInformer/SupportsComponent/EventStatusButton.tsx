import { FC, forwardRef } from 'react';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { EventIcon } from '../../../../components/Icons/EventIcon';
import { EmptyButtonStyled } from '../../../../components/Buttons/EmptyButton.styled';
import { IconProps } from '../../../../components/Icons/Icons';
import { TaskStatusesType } from '../../planner.types';
import { darkColor, TASK_STATUSES } from '../../../../common/constants';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';

export interface EventToggleButtonProps {
  buttonId?: string;
  stopPropagation?: boolean;
  iconProps?: IconProps;
  renderText: boolean;
  isDisabled?: boolean;
  withTooltipInfo?: boolean;
  tooltipInfo?: 'default' | string;
}

interface EventStatusButtonProps extends EventToggleButtonProps {
  status: TaskStatusesType | null;
}

export const EventStatusButton: FC<EventStatusButtonProps> = forwardRef<
  HTMLButtonElement,
  EventStatusButtonProps
>((props, ref) => {
  if (props.withTooltipInfo) {
    return (
      <Tooltip
        content={
          props.tooltipInfo && props.tooltipInfo !== 'default'
            ? props.tooltipInfo
            : `Статус события: ${
                TASK_STATUSES[props.status || 'created'].title
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
            <EventIcon
              {...(props.iconProps || {})}
              status={props.status || 'created'}
            />
            {(props.renderText &&
              TASK_STATUSES[props.status || 'created'].title) ||
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
        <EventIcon
          {...(props.iconProps || {})}
          status={props.status || 'created'}
        />
        {(props.renderText && TASK_STATUSES[props.status || 'created'].title) ||
          ''}
      </FlexBlock>
    </EmptyButtonStyled>
  );
});
