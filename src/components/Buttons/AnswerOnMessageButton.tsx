import { FC } from 'react';

import { currentColor } from '@src/common/constants';

import { AnswerIcon } from '@components/Icons/CalendarIcons/AnswerIcon';
import { IconProps } from '@components/Icons/Icons';
import { FlexBlockProps } from '@components/LayoutComponents/FlexBlock';

import { EmptyButtonStyled } from './EmptyButton.styled';


export interface AnswerOnMessageButtonProps extends Omit<IconProps, 'onClick'> {
  iconContainerProps?: FlexBlockProps;
  onClick?: () => void;
}

export const AnswerOnMessageButton: FC<AnswerOnMessageButtonProps> = ({
  iconContainerProps,
  onClick,
  size = 16,
  color = currentColor,
}) => {
  return (
    <EmptyButtonStyled onClick={onClick}>
      <AnswerIcon {...iconContainerProps} size={size} color={color} />
    </EmptyButtonStyled>
  );
};