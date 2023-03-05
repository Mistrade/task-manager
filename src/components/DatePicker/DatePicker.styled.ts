import styled from 'styled-components'
import {CalendarDate} from '../../pages/Planner/RenderModes/WeekCalendar/CalendarCell/Cell'
import {darkColor, defaultColor, disabledColor} from '../../common/constants'

export const DateItem = styled( CalendarDate )`
  & {
    width: 100%;
    height: 100%;
    margin: 0px;
    font-size: 15px;
    font-weight: 500;
    color: ${_ => _.disabled ? disabledColor : _.isToday ? '#fff' : _.isCurrent ? darkColor : defaultColor} !important;
  }
`
