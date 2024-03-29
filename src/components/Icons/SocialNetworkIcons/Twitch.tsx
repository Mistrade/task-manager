import React, { FC } from 'react';

import { IconProps } from '@components/Icons/Icons';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';

export const TwitchLogoIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = '#5A3E85',
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
        viewBox='0 0 256 268'
      >
        <path
          fill={color}
          d='M17.458 0L0 46.556v186.201h63.983v34.934h34.931l34.898-34.934h52.36L256 162.954V0H17.458Zm23.259 23.263H232.73v128.029l-40.739 40.741H128L93.113 226.92v-34.886H40.717V23.263Zm64.008 116.405H128V69.844h-23.275v69.824Zm63.997 0h23.27V69.844h-23.27v69.824Z'
        />
      </svg>
    </FlexBlock>
  );
};
