import { FC, ReactNode } from 'react';
import { css } from 'styled-components';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';


export interface InputErrorMessageProps {
  isDirty?: boolean;
  errorMessage?: ReactNode;
}

export const InputErrorMessage: FC<InputErrorMessageProps> = ({
  isDirty,
  errorMessage,
}) => {
  if (isDirty && !!errorMessage) {
    return (
      <FlexBlock
        pl={8}
        pr={8}
        mb={6}
        width={'100%'}
        position={'relative'}
        additionalCss={css`
          color: #ff5e5e;
          font-size: 12px;
          font-weight: bold;
        `}
      >
        {errorMessage}
      </FlexBlock>
    );
  }

  return <></>;
};