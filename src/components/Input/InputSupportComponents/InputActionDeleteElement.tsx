import React, { FC } from 'react';

import { CancelIcon } from '@components/Icons/Icons';
import { InputActionDeleteElementContainer } from '@components/Input/InputSupportComponents/InputActions.styled';

export interface InputActionDeleteElementProps {
  onDelete?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export const InputActionDeleteElement: FC<InputActionDeleteElementProps> = ({
  onDelete,
}) => {
  if (!!onDelete) {
    return (
      <InputActionDeleteElementContainer onClick={onDelete}>
        <CancelIcon size={16} />
      </InputActionDeleteElementContainer>
    );
  }
  return <></>;
};
