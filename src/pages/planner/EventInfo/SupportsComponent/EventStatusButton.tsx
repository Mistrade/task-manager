import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { EventIcon } from '@components/Icons/EventIcon';
import { IconProps } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { TaskStatusesType } from '@planner/types';
import { darkColor } from '@src/common/constants/constants';
import { TASK_STATUSES } from '@src/common/constants/signatures';
import { Tooltip } from 'chernikov-kit';
import { FC, forwardRef, useMemo } from 'react';


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
          <EventIcon
            {...(props.iconProps || {})}
            status={props.status || 'created'}
          />
          {(props.renderText &&
            TASK_STATUSES[props.status || 'created'].title) ||
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
            : `Статус события: ${
                TASK_STATUSES[props.status || 'created'].title
              }`
        }
      >
        {base}
      </Tooltip>
    );
  }

  return base;
});