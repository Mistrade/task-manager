import styled, {css} from 'styled-components'
import {CalendarCellDateProps} from './types'
import {borderRadiusSize, currentColor, defaultColor, hoverColor} from '../../common/constants'

export const CalendarDesktopContainer = styled('div')`
  & {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  & * {
    font-family: "Helvetica Neue", sans-serif;
  }
`

export const CalendarDateListContainer = styled('div')<{ rowsCount?: number }>`
  & {
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-rows: repeat(${_ => _.rowsCount || 1}, minmax(1fr, 12fr));
    grid-template-columns: repeat(7, minmax(80px, 1fr));
    grid-column-gap: 4px;
    grid-row-gap: 8px;
  }
`

export const CalendarCellDateFullSize = styled('div')<CalendarCellDateProps>`
  & {
    font-size: ${props => {
      if (props.selected) {
        return '18px'
      }

      return '16px'
    }};

    color: ${props => {
      if (props.selected) {
        return 'rgba(15,15,15,.6)'
      }

      return 'rgba(30,30,30,.4)'
    }}
  }
`

export const CalendarTitle = styled('h2')`
  & {
    font-size: 24px;
    font-family: "Helvetica Neue", sans-serif;
    font-weight: bold;
    color: rgba(15, 15, 15, .6);
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    flex-shrink: 0;
  }
`


export const SwitchCalendarMode = styled('button')<{ isSelected?: boolean }>`
  & {
    outline: none;
    padding: 6px 16px;
    font-size: 16px;
    border: 1px solid ${defaultColor};
    border-radius: ${borderRadiusSize.sm};
    cursor: pointer;
    transition: all .3s ease-in-out;
    background-color: ${props => props.isSelected ? currentColor : '#fff'};
    color: ${props => props.isSelected ? '#fff' : defaultColor};
    min-width: 50px;
  }

  &:hover {
    background-color: ${currentColor};
    color: #fff;
  }

  &:not(:last-child) {
    margin-right: 4px;
  }
`
export const SwitchCalendarModeTab = styled('button')<{ isSelected?: boolean }>`
  & {
    outline: none;
    padding: 6px 16px;
    font-size: 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all .3s ease-in-out;
    color: ${defaultColor};
    min-width: 30px;
    position: relative;
    border-radius: ${borderRadiusSize.sm};
  }

  ${props => {
    if (props.isSelected) {
      return css`
        &:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 4px;
          border-radius: ${borderRadiusSize.xl};
          background-color: ${currentColor};
        }
      `
    }
  }}
  &:hover {
    background-color: ${hoverColor};
    border-radius: ${borderRadiusSize.xs} ${borderRadiusSize.xs} 0px 0px;
  }

  &:not(:last-child) {
    margin-right: 4px;
  }
`

export const TimeSelectorButton = styled(SwitchCalendarMode)`
  margin: 0;
  width: 55px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`
