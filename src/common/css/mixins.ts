import { css, keyframes } from 'styled-components';

import { hoverColor } from '../constants/constants';


export const HoverElementMixin = css`
  & {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    background-color: ${hoverColor};
  }
`;

const scaleAnimationKeyframes = keyframes`
  from {
    opacity: .5;
    transform: scale(.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const scaleAnimation = css`
  animation: ${scaleAnimationKeyframes} 0.3s ease-in-out forwards;
`;
export const borderRadiusSize = {
  xs: '4px',
  sm: '10px',
  md: '16px',
  xl: '20px',
};