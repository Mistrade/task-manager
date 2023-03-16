import React, { FC } from 'react';
import { FlexBlock, FlexBlockProps } from '../../LayoutComponents/FlexBlock';
import { currentColor } from '../../../common/constants';
import { IconProps } from '../Icons';

export const VkLogoIcon: FC<IconProps & FlexBlockProps> = ({
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
        viewBox='0 0 32 32'
      >
        <path
          fill={color}
          d='M20.911 0h-9.823C2.124 0-.001 2.125-.001 11.089v9.823c0 8.964 2.125 11.089 11.089 11.089h9.823C29.875 32.001 32 29.876 32 20.912v-9.823C32 2.125 29.854 0 20.911 0zm4.922 22.828H23.51c-.88 0-1.151-.698-2.734-2.302c-1.375-1.333-1.984-1.51-2.323-1.51c-.479 0-.615.135-.615.792v2.099c0 .563-.177.901-1.667.901c-2.464 0-5.198-1.49-7.115-4.266c-2.891-4.068-3.682-7.115-3.682-7.745c0-.339.135-.656.786-.656h2.328c.589 0 .813.271 1.042.901c1.151 3.323 3.068 6.234 3.859 6.234c.292 0 .427-.135.427-.88v-3.432c-.089-1.583-.922-1.719-.922-2.281c0-.271.224-.542.583-.542h3.661c.495 0 .677.271.677.854v4.63c0 .5.224.677.359.677c.292 0 .542-.177 1.083-.719c1.672-1.875 2.87-4.766 2.87-4.766c.156-.339.427-.656 1.016-.656h2.328c.698 0 .854.359.698.859c-.292 1.354-3.141 5.375-3.141 5.375c-.245.406-.339.583 0 1.036c.25.339 1.063 1.042 1.604 1.672c.995 1.13 1.76 2.078 1.964 2.734c.229.651-.109.99-.766.99z'
        />
      </svg>
    </FlexBlock>
  );
};
