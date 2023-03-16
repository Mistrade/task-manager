import { FC } from 'react';
import { IconProps } from '../Icons';
import { currentColor } from '../../../common/constants';

export const EmptyCheckboxIcon: FC<IconProps> = ({
  color = currentColor,
  size = 24,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 16 16'
  >
    <path
      fill={color}
      d='M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5v-7Zm2.5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-7Z'
    />
  </svg>
);

export const FillCheckboxIcon: FC<IconProps> = ({
  size = 24,
  color = currentColor,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
  >
    <path
      fill={color}
      d='M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3H6.25Zm11.03 6.28l-6.754 6.747a.75.75 0 0 1-1.06 0L6.72 13.28a.75.75 0 0 1 1.06-1.06l2.217 2.216l6.223-6.217a.75.75 0 1 1 1.06 1.062Z'
    />
  </svg>
);
