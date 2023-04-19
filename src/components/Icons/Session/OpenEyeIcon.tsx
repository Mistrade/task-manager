import React, { FC } from 'react';

import { currentColor } from '@src/common/constants/constants';

import { IconProps } from '@components/Icons/Icons';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';


export const OpenEyeIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 24 24'
      >
        <g
          fill='none'
          stroke={color}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
        >
          <path d='M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962Z' />
          <circle cx={size / 2} cy={size / 2} r='3' />
        </g>
      </svg>
    </FlexBlock>
  );
};