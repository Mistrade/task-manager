import { EmptyButtonStyled } from './EmptyButton.styled';
import React, { FC } from 'react';
import { orangeColor } from '@src/common/constants';
import { StarIcon } from '@components/Icons/Icons';

export interface LikeButtonProps {
  isChecked: boolean;
  onChange?: (isChecked: boolean) => void;
}

export const LikeButton: FC<LikeButtonProps> = ({ isChecked, onChange }) => {
  return (
    <EmptyButtonStyled
      onClick={(e) => {
        e.stopPropagation();
        onChange && onChange(!isChecked);
      }}
    >
      <StarIcon
        size={20}
        color={isChecked ? orangeColor : '#000'}
        fillColor={isChecked ? orangeColor : 'none'}
      />
    </EmptyButtonStyled>
  );
};
