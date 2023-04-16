import React, { FC } from 'react';

import { IconProps } from '@components/Icons/Icons';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';


export const SkypeLogoIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = '#00AFF0',
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
          fill={color}
          d='M246.939 149.01c-.081.45-.138.905-.223 1.355l-.438-2.579c.24.402.438.82.661 1.225a121.489 121.489 0 0 0 2.015-21.913c0-16.318-3.195-32.15-9.507-47.053c-6.09-14.396-14.802-27.325-25.91-38.425c-11.092-11.1-24.03-19.813-38.418-25.902c-14.899-6.304-30.73-9.499-47.048-9.499c-7.69 0-15.394.722-22.89 2.161c-.016.004-.036.004-.057.008c.422.223.848.422 1.261.653l-2.542-.398c.426-.08.856-.17 1.281-.255C94.84 2.92 83.272 0 71.564 0C52.45 0 34.477 7.443 20.96 20.964C7.447 34.481 0 52.453 0 71.568a71.498 71.498 0 0 0 9.004 34.696c.077-.438.13-.88.215-1.318l.438 2.534c-.227-.397-.426-.811-.653-1.216a121.745 121.745 0 0 0-1.82 20.834c0 16.322 3.195 32.15 9.507 47.057c6.081 14.4 14.798 27.32 25.894 38.42c11.108 11.101 24.029 19.826 38.433 25.899c14.9 6.316 30.735 9.515 47.053 9.515c7.103 0 14.222-.649 21.17-1.881c-.405-.227-.818-.434-1.232-.673l2.583.454c-.446.085-.896.138-1.35.219a71.506 71.506 0 0 0 35.206 9.276c19.111 0 37.075-7.432 50.592-20.956c13.52-13.509 20.96-31.485 20.96-50.6a71.57 71.57 0 0 0-9.061-34.817Zm-118.386 52.121c-42.945 0-62.158-21.114-62.158-36.937c0-8.117 5.992-13.805 14.25-13.805c18.378 0 13.618 26.389 47.908 26.389c17.555 0 27.248-9.532 27.248-19.286c0-5.866-2.894-12.37-14.453-15.22l-38.198-9.535c-30.763-7.715-36.346-24.345-36.346-39.978c0-32.457 30.56-44.644 59.26-44.644c26.437 0 57.602 14.611 57.602 34.083c0 8.344-7.225 13.196-15.48 13.196c-15.685 0-12.798-21.71-44.392-21.71c-15.678 0-24.362 7.1-24.362 17.259c0 10.14 12.382 13.379 23.133 15.827l28.274 6.276c30.97 6.9 38.823 24.982 38.823 42.013c0 26.377-20.247 46.072-61.109 46.072Zm19.456 44.304c.414.24.827.446 1.233.673c.454-.081.904-.134 1.35-.22l-2.583-.453Zm98.707-95.07c.085-.45.142-.904.223-1.354c-.223-.406-.422-.823-.66-1.225l.437 2.579ZM9.219 104.946c-.085.438-.138.88-.215 1.318c.227.405.426.819.653 1.216l-.438-2.534Zm97.166-95.905c-.413-.231-.839-.43-1.26-.653c-.426.085-.856.174-1.282.255l2.542.398Z'
        />
      </svg>
    </FlexBlock>
  );
};