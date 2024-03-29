import {
  stepByStepAnimation,
  StepByStepAnimationProps,
} from './Modes/Week/components/styled';
import {
  darkColor,
  defaultColor,
  disabledColor,
  hoverColor,
} from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';
import { kitColors } from 'chernikov-kit';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';


export const CalendarDateListContainer = styled('div')<{ rowsCount?: number }>`
  & {
    width: 100%;
    height: fit-content;
    display: flex;
    gap: 6px;
    flex-direction: column;
    z-index: 0;
  }
`;

export const CalendarTitle = styled('h2')`
  & {
    font-size: 20px;
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: normal;
    color: ${darkColor};
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    flex-shrink: 0;
  }
`;

export const SwitchCalendarMode = styled('button')<{ isSelected?: boolean }>`
  & {
    outline: none;
    padding: 6px 16px;
    font-size: 16px;
    border: 1px solid ${kitColors.primary};
    border-radius: ${borderRadiusSize.sm};
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background-color: ${(props) =>
      props.isSelected ? kitColors.primary : '#fff'};
    color: ${(props) => (props.isSelected ? '#fff' : defaultColor)};
    min-width: 50px;
  }

  &:hover {
    background-color: ${kitColors.primary} !important;
    color: #fff;
  }
`;

const SwitchMainStyles = css`
  & {
    outline: none;
    text-decoration: none;
    padding: 6px 16px;
    font-size: 15px;
    white-space: normal;
    text-align: center;
    flex-shrink: 0;
    vertical-align: middle;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    color: ${defaultColor};
    width: fit-content;
    min-width: 30px;
    max-width: 300px;
    position: relative;
    border-radius: ${borderRadiusSize.sm};
    height: 40px;
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: ${borderRadiusSize.xl};
    background-color: transparent;
    transition: all 0.3s ease-in;
  }

  &:hover {
    background-color: ${hoverColor};
    border-radius: ${borderRadiusSize.xs} ${borderRadiusSize.xs} 0px 0px;
  }
`;

export const SwitchCalendarModeTab = styled('button')<
  {
    isSelected?: boolean;
  } & StepByStepAnimationProps
>`
  ${SwitchMainStyles};
  ${stepByStepAnimation};

  ${(props) => {
    if (props.isSelected) {
      return css`
        &:after {
          bottom: 0px;
          background-color: ${kitColors.primary};
        }
      `;
    }
  }}
`;

export const PlannerNavLink = styled(NavLink)`
  ${SwitchMainStyles}
  &.active:after {
    bottom: 0px;
    background-color: ${kitColors.primary};
  }
`;

export const TimeSelectorButton = styled(SwitchCalendarMode)`
  margin: 0;
  scroll-snap-align: center;
  scroll-behavior: smooth;
`;

export const PlannerOptionPanelContainer = styled('div')<{ state?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 290px;
  background-color: ${'#fff'};
  padding: 0px 12px;
  flex-shrink: 0;
  border-right: 1px solid ${disabledColor};
  transition: all 0.25s ease-in-out;

  ${(_) =>
    _.state === false
      ? css`
          width: 75px !important;
        `
      : ''}
`;

PlannerOptionPanelContainer.defaultProps = {
  state: true,
};

export const PlannerContainer = styled('div')`
  & {
    display: flex;
    position: relative;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;
  }
`;

export const PlannerContentContainer = styled('div')`
  & {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    padding-top: 20px;
  }
`;

export const PlannerLayoutContainer = styled('div')`
  & {
    display: flex;
    padding: 0px 24px;
    flex-grow: 3;
    flex-shrink: 0;
    flex-basis: 80%;
    height: 100%;
    background-color: #fff;
  }
`;