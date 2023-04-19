import React, { FC, ReactNode } from 'react';
import { css } from 'styled-components';

import { LoaderIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';

export interface InputIconContainerProps {
  icon?: ReactNode;
  iconPlacement?: 'left' | 'right';
  isLoading?: boolean;
}

export const InputIconContainer: FC<InputIconContainerProps> = ({
  icon,
  iconPlacement,
  isLoading,
}) => {
  if (icon || isLoading) {
    return (
      <FlexBlock
        position={'absolute'}
        height={30}
        width={30}
        // overflow={'hidden'}
        justify={iconPlacement === 'right' ? 'flex-end' : 'center'}
        align={'center'}
        additionalCss={css`
          top: 50%;
          transform: translateY(-50%);
          ${iconPlacement === 'right'
            ? css`
                right: 10px;
              `
            : css`
                left: 10px;
              `};
        `}
      >
        {isLoading ? <LoaderIcon /> : icon || ''}
      </FlexBlock>
    );
  }
  return <></>;
};
