import styled from 'styled-components'
import { CalendarCellDateProps } from './types'

export const CalendarDesktopContainer = styled( 'div' )`
  & {
    position: relative;
    max-width: 100%;
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
    grid-template-columns: repeat(7, minmax(50px, 1fr));
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 12px;
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
    padding: 16px 0;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 2;
    font-size: 24px;
    font-family: "Helvetica Neue", sans-serif;
    font-weight: bold;
    color: rgba(15, 15, 15, .6);
    margin-bottom: 24px;
    margin-top: 0;
  }
`

export const StyledCalendar = {
  f: {
    Cell: CalendarCellDateFullSize
  }
}
