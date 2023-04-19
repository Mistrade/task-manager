import React, { FC } from 'react';

import { currentColor } from '@src/common/constants/constants';

import { IconProps } from '@components/Icons/Icons';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';


export const MiroLogoIcon: FC<IconProps & FlexBlockProps> = ({
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
          d='M17.392 0H13.9L17 4.808L10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985L6.949 24h3.494L17 5.494L13.899 24h3.493L24 3.672L17.392 0z'
        />
      </svg>
    </FlexBlock>
  );
};