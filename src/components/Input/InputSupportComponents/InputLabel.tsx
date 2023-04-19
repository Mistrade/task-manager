import React, { FC, ReactNode } from 'react';

import { StyledLabel } from '@components/Input/Input.styled';
import { FlexBlock } from '@components/LayoutComponents';

export interface InputLabelProps {
  inputId?: string;
  label?: ReactNode;
  tooltip?: ReactNode;
}

export const InputLabel: FC<InputLabelProps> = ({
  label,
  inputId,
  tooltip,
}) => {
  if (label) {
    return (
      <FlexBlock
        width={'100%'}
        height={'100%'}
        align={'center'}
        justify={'flex-start'}
        mb={8}
        pl={6}
        pr={6}
        gap={6}
      >
        <StyledLabel htmlFor={inputId}>{label}</StyledLabel>
        {tooltip || ''}
      </FlexBlock>
    );
  }

  return <></>;
};
