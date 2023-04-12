import React, { FC } from 'react';
import { IconProps } from '@components/Icons/Icons';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';
import { currentColor } from '@src/common/constants';

export const ZoomLogoIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        role='img'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 24 24'
      >
        <path
          fill={color}
          fillRule='evenodd'
          d='M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12S5.373 0 12 0s12 5.373 12 12ZM6 16.2h9V9.6a1.8 1.8 0 0 0-1.8-1.8h-9v6.6A1.8 1.8 0 0 0 6 16.2Zm10.2-2.4l3.6 2.4V7.8l-3.6 2.4v3.6Z'
          clipRule='evenodd'
        />
      </svg>
    </FlexBlock>
  );
};
