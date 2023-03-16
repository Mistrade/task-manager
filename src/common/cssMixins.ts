import { css } from 'styled-components';
import { hoverColor } from './constants';

export const HoverElementMixin = css`
  & {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    background-color: ${hoverColor};
  }
`;
