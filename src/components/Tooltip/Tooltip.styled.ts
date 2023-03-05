import styled, {createGlobalStyle, css} from 'styled-components'
import {
	borderRadiusSize,
	currentColor,
	currentColorWithoutBlur, darkColor,
	defaultColor,
	disabledColor, hoverColor, lightHoverColor, pageHeaderColor, shadowColor
} from '../../common/constants'
import {pxToCssValue} from '../LayoutComponents/FlexBlock'
import {OptionsTooltip} from './Tooltip'

export const TooltipWrapper = styled('span')`
  & {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`


export const TooltipContent = styled('span')<{ isVisible: boolean, left: number | string, top: number | string, opacity: number, placement: OptionsTooltip['placement'] }>`
  & {
    display: flex;
    visibility: ${_ => _.isVisible ? 'visible' : 'hidden'};
    position: absolute;
    top: ${_ => pxToCssValue(_.top)};
    left: ${_ => pxToCssValue(_.left)};
    z-index: 10000;
    width: max-content;
    word-wrap: break-word;
    min-width: 50px;
    max-width: 400px;
    flex-shrink: 1;
    border-radius: ${borderRadiusSize.xs};
    background-color: ${currentColorWithoutBlur};
    color: #fff;
    text-align: center;
    padding: 4px 6px;
    box-shadow: 0px 0px 6px ${defaultColor};
    opacity: ${_ => _.opacity};
    transition: opacity .3s ease-in, visibility .3s ease-in;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    font-size: 12px;
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
            top: 20px;
            transform: translateY(-50%) rotate(45deg);
            left: -7px;
          `
      }
    }
    }
`


export const TooltipStyled = createGlobalStyle({}, css`
  [data-tippy-root] {
    opacity: 1;

    [data-theme="current"] {
      background-color: ${currentColorWithoutBlur};
      border-radius: ${borderRadiusSize.sm};
      opacity: 1;
    }

    [data-theme="light"] {
      background-color: #fff;
      border-radius: ${borderRadiusSize.sm};
      color: ${darkColor};
      z-index: 99999;
      opacity: 1;
    }

    [data-theme="midnight"] {
      background-color: ${pageHeaderColor};
      border-radius: ${borderRadiusSize.sm};
      color: ${darkColor};
      z-index: 99999;
      opacity: 1;
    }

    [data-placement^="right"][data-theme="light"] {
      box-shadow: 12px 12px 25px 4px ${shadowColor};
    }

    [data-placement^="top"][data-theme="light"] {
      box-shadow: 0px -18px 40px 4px ${shadowColor};
    }

    [data-placement^="bottom"][data-theme="light"] {
      box-shadow: 0px 18px 40px 4px ${shadowColor};
    }

    [data-placement^="left"][data-theme="light"] {
      box-shadow: -12px 12px 25px 4px ${shadowColor};
    }

    [data-theme="current"][data-placement^="right"] > .tippy-arrow::before {
      border-right-color: ${currentColorWithoutBlur};
    }

    [data-theme="current"][data-placement^="left"] > .tippy-arrow::before {
      border-left-color: ${currentColorWithoutBlur};
    }

    [data-theme="current"][data-placement^="top"] > .tippy-arrow::before {
      border-top-color: ${currentColorWithoutBlur};
    }

    [data-theme="current"][data-placement^="bottom"] > .tippy-arrow::before {
      border-bottom-color: ${currentColorWithoutBlur};
    }

    [data-theme="light"][data-placement^="right"] > .tippy-arrow::before {
      border-right-color: #fff;
    }

    [data-theme="light"][data-placement^="left"] > .tippy-arrow::before {
      border-left-color: #fff
    }

    [data-theme="light"][data-placement^="top"] > .tippy-arrow::before {
      border-top-color: #fff;
    }

    [data-theme="light"][data-placement^="bottom"] > .tippy-arrow::before {
      border-bottom-color: #fff
    }

    [data-theme="midnight"][data-placement^="right"] > .tippy-arrow::before {
      border-right-color: ${pageHeaderColor};
    }

    [data-theme="midnight"][data-placement^="left"] > .tippy-arrow::before {
      border-left-color: ${pageHeaderColor};
    }

    [data-theme="midnight"][data-placement^="top"] > .tippy-arrow::before {
      border-top-color: ${pageHeaderColor};
    }

    [data-theme="midnight"][data-placement^="bottom"] > .tippy-arrow::before {
      border-bottom-color: ${pageHeaderColor};
    }
  }
`)