import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import {
  currentColor,
  darkColor,
  defaultColor,
  disabledColor,
  hoverColor,
} from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';


export const CalendarDateListContainer = styled('div')<{ rowsCount?: number }>`
  & {
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-rows: repeat(${(_) => _.rowsCount || 1}, minmax(1fr, 12fr));
    grid-template-columns: repeat(7, minmax(80px, 1fr));
    grid-column-gap: 4px;
    grid-row-gap: 8px;
    padding-bottom: 100px;
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
    border: 1px solid ${defaultColor};
    border-radius: ${borderRadiusSize.sm};
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background-color: ${(props) => (props.isSelected ? currentColor : '#fff')};
    color: ${(props) => (props.isSelected ? '#fff' : defaultColor)};
    min-width: 50px;
  }

  &:hover {
    color: ${darkColor};
  }

  &:not(:last-child) {
    margin-right: 4px;
  }
`;
export const SwitchCalendarModeTab = styled('button')<{ isSelected?: boolean }>`
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
    transition: all 0.3s ease-in-out;
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

  ${(props) => {
    if (props.isSelected) {
      return css`
        &:after {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 0;
          width: 100%;
          height: 3px;
          border-radius: ${borderRadiusSize.xl};
          background-color: ${currentColor};
        }
      `;
    }
  }}
  &:hover {
    background-color: ${hoverColor};
    border-radius: ${borderRadiusSize.xs} ${borderRadiusSize.xs} 0px 0px;
  }
`;

export const PlannerNavLink = styled(NavLink)`
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
    transition: all 0.3s ease-in-out;
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

  &.active:after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: ${borderRadiusSize.xl};
    background-color: ${currentColor};
  }

  &:hover {
    background-color: ${hoverColor};
    border-radius: ${borderRadiusSize.xs} ${borderRadiusSize.xs} 0px 0px;
  }
`;

export const TimeSelectorButton = styled(SwitchCalendarMode)`
  margin: 0;
  width: 55px;
  scroll-snap-align: end;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  &:last-child {
    margin-bottom: 100%;
  }
`;

export const PlannerOptionPanelContainer = styled('div')`
  & {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 260px;
    background-color: ${'#fff'};
    padding: 0px 12px;
    //flex-basis: 20%;
    flex-shrink: 0;
    //border-right: 1px solid ${disabledColor};
  }
`;

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
    //overflow: hidden;
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
    //overflow: hidden;
    height: 100%;
    background-color: #fff;
  }
`;