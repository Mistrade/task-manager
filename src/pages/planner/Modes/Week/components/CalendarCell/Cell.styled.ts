import styled, { css, keyframes } from 'styled-components';

import {
  defaultColor,
  disabledColor,
  lightHoverColor,
} from '../../../../../../common/constants/constants';
import { borderRadiusSize } from '../../../../../../common/css/mixins';

export const CellDateStyledContainer = styled('div')`
  & {
    width: 100%;
    display: flex;
    position: relative;
    height: 50px;
    gap: 6px;
    border-radius: ${borderRadiusSize.sm};
    justify-content: flex-end;
    flex-wrap: nowrap;
    align-items: center;
    margin-bottom: 4px;
    // background-color: ${lightHoverColor};
    flex-shrink: 0;
  }
`;

const cellDateHoverContainerAnimation = keyframes`
  from {
    transform: scale(.7);
    opacity: .5;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const CellDateHoverContainer = styled('div')`
  & {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${cellDateHoverContainerAnimation} 0.3s ease-in-out forwards;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export interface CalendarCellStyledComponentProps {
  disabled?: boolean;
  isCurrent?: boolean;
  isHover?: boolean;
  isToday?: boolean;
  isVisible?: boolean;
  fullWidth?: boolean;
}

export const CalendarDate = styled('span')<CalendarCellStyledComponentProps>`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 4px;
    background-color: ${(props) =>
      props.isToday ? 'rgba(255,117,66, 1)' : ''};
    color: ${(props) =>
      props.disabled ? disabledColor : props.isToday ? '#fff' : defaultColor};
    transition: all 0.3s ease-in;
  }

  ${(props) => {
    if (props.isHover) {
      return css`
        & {
          color: black;
        }
      `;
    }
  }}
`;
