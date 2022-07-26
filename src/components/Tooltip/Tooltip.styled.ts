import styled, { css } from 'styled-components'
import {
  currentColor,
  currentColorWithoutBlur,
  defaultColor,
  disabledColor
} from '../../common/constants'
import { pxToCssValue } from '../LayoutComponents/FlexBlock'
import { OptionsTooltip } from './Tooltip'

export const TooltipWrapper = styled( 'span' )`
  & {
    position: relative;
    cursor: pointer;
  }
`


export const TooltipContent = styled( 'span' )<{ isVisible: boolean, left: number | string, top: number | string, opacity: number, placement: OptionsTooltip['placement'] }>`
  & {
    display: flex;
    visibility: ${_ => _.isVisible ? 'visible' : 'hidden'};
    position: absolute;
    top: ${_ => pxToCssValue( _.top )};
    left: ${_ => pxToCssValue( _.left )};
    z-index: 10000;
    width: max-content;
    word-wrap: break-word;
    min-width: 200px;
    max-width: 400px;
    flex-shrink: 1;
    border-radius: 4px;
    background-color: ${currentColorWithoutBlur};
    color: #fff;
    text-align: center;
    padding: 10px 12px;
    box-shadow: 0px 0px 6px ${defaultColor};
    opacity: ${_ => _.opacity};
    transition: opacity .3s ease-in, visibility .3s ease-in;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    width: 14px;
    height: 14px;
    transform: rotate(45deg) translateX(-50%);
    background-color: ${currentColorWithoutBlur};
    z-index: -10;
    ${_ => {
      switch (_.placement) {
        case 'top':
          return css`bottom: -10px`
        case 'bottom':
          return css`top: -1px`
        case 'right':
          return css`
            top: 30px;
            transform: translateY(-50%) rotate(45deg);
            left: -7px;
          `
      }
    }
    }
`
