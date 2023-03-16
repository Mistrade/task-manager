import React, { FC } from 'react';
import { FlexBlock, FlexBlockProps } from '../../LayoutComponents/FlexBlock';
import { currentColor } from '../../../common/constants';
import { IconProps } from '../Icons';

export const FigmaLogoIcon: FC<IconProps & FlexBlockProps> = ({
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
        width={(size * 2) / 3}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 256 384'
      >
        <path
          fill='#0ACF83'
          d='M64 384c35.328 0 64-28.672 64-64v-64H64c-35.328 0-64 28.672-64 64s28.672 64 64 64Z'
        />
        <path
          fill='#A259FF'
          d='M0 192c0-35.328 28.672-64 64-64h64v128H64c-35.328 0-64-28.672-64-64Z'
        />
        <path
          fill='#F24E1E'
          d='M0 64C0 28.672 28.672 0 64 0h64v128H64C28.672 128 0 99.328 0 64Z'
        />
        <path
          fill='#FF7262'
          d='M128 0h64c35.328 0 64 28.672 64 64s-28.672 64-64 64h-64V0Z'
        />
        <path
          fill='#1ABCFE'
          d='M256 192c0 35.328-28.672 64-64 64s-64-28.672-64-64s28.672-64 64-64s64 28.672 64 64Z'
        />
      </svg>
    </FlexBlock>
  );
};
