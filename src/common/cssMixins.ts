import { css } from 'styled-components'
import { currentColor, hoverColor } from './constants'

export const HoverElementMixin = css`
  & {
    cursor: pointer;
    transition: all .3s ease-in-out;
  }

  &:hover {
    background-color: ${hoverColor};
  }
`
