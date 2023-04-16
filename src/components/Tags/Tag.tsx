import { FC, ReactNode } from 'react';

import { defaultColor } from '@src/common/constants';

import { EmptyButtonStyled } from '../Buttons/EmptyButton.styled';
import { TrashIcon } from '../Icons/Icons';
import { TagStyled } from './Tag.styled';


export interface TagProps {
  children: ReactNode;
  onRemove?: () => void;
}

export const Tag: FC<TagProps> = ({ children, onRemove }) => {
  return (
    <TagStyled>
      {children}
      {onRemove && (
        <EmptyButtonStyled onClick={onRemove}>
          <TrashIcon size={14} color={defaultColor} />
        </EmptyButtonStyled>
      )}
    </TagStyled>
  );
};