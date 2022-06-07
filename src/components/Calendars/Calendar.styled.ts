import styled from 'styled-components'
import { CalendarCellDateProps } from './types'
import { currentColor, defaultColor } from '../../common/constants'

export const CalendarDesktopContainer = styled( 'div' )`
  & {
    position: relative;
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  & * {
    font-family: "Helvetica Neue", sans-serif;
  }
`

export const CalendarDateListContainer = styled( 'div' )`
  & {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-template-columns: repeat(7, minmax(80px, 1fr));
    grid-column-gap: 4px;
    grid-row-gap: 16px;
  }
`

export const CalendarCellDateFullSize = styled( 'div' )<CalendarCellDateProps>`
  & {
    font-size: ${props => {
      if( props.selected ) {
        return '18px'
      }

      return '16px'
    }};

    color: ${props => {
      if( props.selected ) {
        return 'rgba(15,15,15,.6)'
      }

      return 'rgba(30,30,30,.4)'
    }}
  }
`

export const CalendarTitle = styled( 'h2' )`
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


export const SwitchCalendarMode = styled( 'button' )<{ isSelected?: boolean }>`
  & {
    outline: none;
    padding: 6px 16px;
    font-size: 16px;
    border: 1px solid ${defaultColor};
    border-radius: 4px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    background-color: ${props => props.isSelected ? currentColor : '#fff'};
    color: ${props => props.isSelected ? '#fff' : defaultColor};
  }

  &:hover {
    background-color: ${currentColor};
    color: #fff;
  }

  &:not(:last-child) {
    margin-right: 4px;
  }
`
