import { TagStyled } from './Tag.styled';
import { FC, ReactNode } from 'react';
import { TrashIcon } from '../Icons/Icons';
import { defaultColor } from '@src/common/constants';
import { EmptyButtonStyled } from '../Buttons/EmptyButton.styled';

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
