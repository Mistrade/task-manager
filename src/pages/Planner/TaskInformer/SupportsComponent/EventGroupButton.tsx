import { FC, forwardRef } from 'react';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import {
  currentColor,
  darkColor,
  defaultColor,
} from '../../../../common/constants';
import { EmptyButtonStyled } from '../../../../components/Buttons/EmptyButton.styled';
import { FlexBlock } from '../../../../components/LayoutComponents/FlexBlock';
import { EventToggleButtonProps } from './EventStatusButton';
import { GroupModelResponse } from '../../../../store/api/planning-api/types/groups.types';
import { LoaderIcon } from '../../../../components/Icons/Icons';
import { GroupLogo } from '../../Groups/GroupList.styled';

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
