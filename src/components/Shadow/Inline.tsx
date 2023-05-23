import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

import {
  DefaultAnimationTimingFn,
  DefaultShadowEndColor,
  DefaultShadowStartColor,
} from '../../common/constants/styles';
import { pxToCssValue } from '../LayoutComponents/FlexBlock';

export interface BaseShadowProps {
  transitionDurationMs?: number;
  visible?: boolean;
  zIndex?: number;
  fromColor?: string;
  toColor?: string;
  maxSize?: number;
  placement: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
}

const topShadowMixin = (props: BaseShadowProps): FlattenSimpleInterpolation => {
  return css`
    top: ${pxToCssValue(props.offset || 0)};
    left: 0;
    right: 0;
    max-height: ${pxToCssValue(props.maxSize || 50)};
    background: linear-gradient(
      to bottom,
      ${props.fromColor || DefaultShadowStartColor},
      ${props.toColor || DefaultShadowEndColor}
    );
  `;
};

const bottomShadowMixin = (
  props: BaseShadowProps
): FlattenSimpleInterpolation => {
  return css`
    bottom: ${pxToCssValue(props.offset || 0)};
    left: 0;
    right: 0;
    max-height: ${pxToCssValue(props.maxSize || 50)};

    background: linear-gradient(
      to top,
      ${props.fromColor || DefaultShadowStartColor},
      ${props.toColor || DefaultShadowEndColor}
    );
  `;
};

const rightShadowMixin = (
  props: BaseShadowProps
): FlattenSimpleInterpolation => {
  return css`
    right: ${pxToCssValue(props.offset || 0)};
    top: 0;
    bottom: 0;
    max-width: ${pxToCssValue(props.maxSize || 50)};
    background: linear-gradient(
      to left,
      ${props.fromColor || DefaultShadowStartColor},
      ${props.toColor || DefaultShadowEndColor}
    );
  `;
};

const leftShadowMixin = (
  props: BaseShadowProps
): FlattenSimpleInterpolation => {
  return css`
    left: ${pxToCssValue(props.offset || 0)};
    top: 0;
    bottom: 0;
    max-width: ${pxToCssValue(props.maxSize || 50)};
    background: linear-gradient(
      to right,
      ${props.fromColor || DefaultShadowStartColor},
      ${props.toColor || DefaultShadowEndColor}
    );
  `;
};

const getShadowStyles = (
  props: BaseShadowProps
): FlattenSimpleInterpolation => {
  switch (props.placement) {
    case 'top':
      return topShadowMixin(props);
    case 'bottom':
      return bottomShadowMixin(props);
    case 'left':
      return leftShadowMixin(props);
    case 'right':
      return rightShadowMixin(props);
  }
};

const getStateStyles = (props: BaseShadowProps): FlattenSimpleInterpolation => {
  if (props.visible) {
    return css`
      box-shadow: 0 0 20px 20px ${props.toColor || DefaultShadowEndColor};
      ${props.placement === 'top' || props.placement === 'bottom'
        ? css`
            height: 10%;
          `
        : css`
            width: 10%;
          `};
    `;
  }

  return css`
    height: 0;
    box-shadow: none;
  `;
};

const Shadow = styled('div')<BaseShadowProps>`
  pointer-events: none;
  position: absolute;
  z-index: ${(props) => props.zIndex || 1};
  transition: all ${(props) => props.transitionDurationMs || 200}ms
    ${DefaultAnimationTimingFn};
  ${getStateStyles}
  ${getShadowStyles}
`;

export default Shadow;
