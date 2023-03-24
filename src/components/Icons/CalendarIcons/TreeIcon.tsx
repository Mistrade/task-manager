import React, { FC } from 'react';
import { IconProps } from '../Icons';
import { FlexBlock, FlexBlockProps } from '../../LayoutComponents/FlexBlock';
import { currentColor } from '../../../common/constants';

export const TreeIcon: FC<IconProps & FlexBlockProps> = ({
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
        viewBox='0 0 48 48'
      >
        <g transform={`rotate(90 24 24)`}>
          <mask id='ipSTreeDiagram0'>
            <g fill={'none'} stroke={color} strokeWidth='4'>
              <circle cx='10' cy='24' r='4' fill='#fff' />
              <circle cx='38' cy='10' r='4' fill='#fff' />
              <circle cx='38' cy='24' r='4' fill='#fff' />
              <circle cx='38' cy='38' r='4' fill='#fff' />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M34 38H22V10h12M14 24h20'
              />
            </g>
          </mask>
          <path fill={color} d='M0 0h48v48H0z' mask='url(#ipSTreeDiagram0)' />
        </g>
      </svg>
    </FlexBlock>
  );
};