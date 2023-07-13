import { EventToggleButtonProps } from './EventStatusButton';
import { GroupModelResponse } from '@api/planning-api/types/groups.types';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { LoaderIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { GroupLogo } from '@planner/Groups/styled';
import { kitColors, Tooltip } from 'chernikov-kit';
import { FC, forwardRef, useMemo } from 'react';


export interface EventGroupButtonProps extends EventToggleButtonProps {
  group: GroupModelResponse | null;
  isLoading?: boolean;
}

export const EventGroupButton: FC<EventGroupButtonProps> = forwardRef<
  HTMLButtonElement,
  EventGroupButtonProps
>((props, ref) => {
  const base = useMemo(() => {
    return (
      <EmptyButtonStyled
        id={props.buttonId}
        onClick={(e) => props.stopPropagation && e.stopPropagation()}
      >
        <FlexBlock
          gap={6}
          align={'center'}
          fSize={15}
          style={{ color: kitColors.dark }}
        >
          {props.isLoading ? (
            <LoaderIcon
              size={20}
              {...props.iconProps}
              color={kitColors.primary}
            />
          ) : (
            <GroupLogo
              color={props.group?.color || kitColors.divider}
              {...props.iconProps}
            />
          )}
          {props.renderText &&
            (props.group?.title || 'Группа событий не выбрана')}
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
            : `Группа событий: ${props.group?.title || 'Не выбрано'}`
        }
      >
        {base}
      </Tooltip>
    );
  }

  return base;
});