import React, { FC } from 'react';
import { FlexBlock, FlexBlockProps } from '../../LayoutComponents/FlexBlock';
import { currentColor } from '../../../common/constants';
import { IconProps } from '../Icons';

export const TelegramLogoIcon: FC<IconProps & FlexBlockProps> = ({
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
        viewBox='0 0 256 256'
      >
        <path
          fill='#40B3E0'
          d='M128 0C57.307 0 0 57.307 0 128s57.307 128 128 128s128-57.307 128-128S198.693 0 128 0Z'
        />
        <path
          fill='#FFF'
          d='M190.283 73.63L167.42 188.899s-3.197 7.994-11.99 4.157l-52.758-40.448l-19.184-9.272l-32.294-10.872s-4.956-1.758-5.436-5.595c-.48-3.837 5.596-5.915 5.596-5.915l128.376-50.36s10.552-4.636 10.552 3.038'
        />
        <path
          fill='#D2E5F1'
          d='M98.618 187.603s-1.54-.144-3.46-6.22c-1.917-6.075-11.67-38.049-11.67-38.049l77.538-49.24s4.477-2.718 4.317 0c0 0 .799.48-1.6 2.718c-2.397 2.239-60.91 54.836-60.91 54.836'
        />
        <path
          fill='#B5CFE4'
          d='m122.901 168.115l-20.867 19.026s-1.632 1.238-3.416.462l3.996-35.34'
        />
      </svg>
    </FlexBlock>
  );
};
