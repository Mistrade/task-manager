import React, { FC } from 'react';

import { currentColor } from '@src/common/constants';

import { IconProps } from '@components/Icons/Icons';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';


export const AnswerIcon: FC<IconProps & FlexBlockProps> = ({
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
        viewBox='0 0 24 24'
      >
        <path
          fill={color}
          d='m20 8l-5.5 5.5l-1.41-1.41L16.17 9H10.5C8 9 6 11 6 13.5V20H4v-6.5A6.5 6.5 0 0 1 10.5 7h5.67l-3.09-3.09L14.5 2.5L20 8Z'
        />
      </svg>
    </FlexBlock>
  );
};