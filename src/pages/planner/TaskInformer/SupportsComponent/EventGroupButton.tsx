import { FC, forwardRef } from 'react';

import {
  currentColor,
  darkColor,
  defaultColor,
} from '@src/common/constants/constants';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { LoaderIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { GroupLogo } from '@planner/Groups/GroupList.styled';

import { GroupModelResponse } from '@api/planning-api/types/groups.types';

import { EventToggleButtonProps } from './EventStatusButton';


export interface EventGroupButtonProps extends EventToggleButtonProps {
  group: GroupModelResponse | null;
  isLoading?: boolean;
}

export const EventGroupButton: FC<EventGroupButtonProps> = forwardRef<
  HTMLButtonElement,
  EventGroupButtonProps
>((props, ref) => {
  if (props.withTooltipInfo) {
    return (
      <Tooltip
        content={
          props.tooltipInfo && props.tooltipInfo !== 'default'
            ? props.tooltipInfo
            : `Группа событий: ${props.group?.title || 'Не выбрано'}`
        }
      >
        <EmptyButtonStyled
          id={props.buttonId}
          onClick={(e) => props.stopPropagation && e.stopPropagation()}
        >
          <FlexBlock
            gap={6}
            align={'center'}
            fSize={15}
            style={{ color: darkColor }}
          >
            {props.isLoading ? (
              <LoaderIcon size={20} {...props.iconProps} color={currentColor} />
            ) : (
              <GroupLogo
                color={props.group?.color || defaultColor}
                {...props.iconProps}
              />
            )}
            {props.renderText &&
              (props.group?.title || 'Группа событий не выбрана')}
          </FlexBlock>
        </EmptyButtonStyled>
      </Tooltip>
    );
  }

  return (
    <EmptyButtonStyled
      id={props.buttonId}
      onClick={(e) => props.stopPropagation && e.stopPropagation()}
    >
      <FlexBlock
        gap={6}
        align={'center'}
        fSize={15}
        style={{ color: darkColor }}
      >
        {props.isLoading ? (
          <LoaderIcon size={20} {...props.iconProps} color={currentColor} />
        ) : (
          <GroupLogo
            color={props.group?.color || defaultColor}
            {...props.iconProps}
          />
        )}
        {props.renderText &&
          (props.group?.title || 'Группа событий не выбрана')}
      </FlexBlock>
    </EmptyButtonStyled>
  );
});