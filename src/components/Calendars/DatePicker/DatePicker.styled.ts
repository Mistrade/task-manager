import styled from 'styled-components'
import { CalendarDate } from '../Cell'
import { darkColor, disabledColor } from '../../../common/constants'

export const DateItem = styled( CalendarDate )`
  & {
    width: 100%;
    height: 100%;
    margin: 0px;
    font-size: 15px;
    font-weight: 500;
    color: ${( {
                                                         isCurrent,
                                                         isToday
                                                       } ) => isToday ? '#fff' : isCurrent ? darkColor : disabledColor} !important;
  }
`
