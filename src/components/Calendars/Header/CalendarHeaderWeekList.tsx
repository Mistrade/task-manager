import { FC } from 'react'
import { CalendarHeaderWeekListProps } from '../types'
import { CalendarDateListContainer } from '../Calendar.styled'
import { defaultColor, WeekDaysList, WeekDaysShortList } from '../../../common/constants'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'

export const CalendarHeaderWeekList: FC<CalendarHeaderWeekListProps> = ( {
                                                                           renderWeekPattern,
                                                                           current
                                                                         } ) => {
  if( current.layout === 'week' || current.layout === 'month' ) {
    if( renderWeekPattern === 'full' ) {
      return (
        <CalendarDateListContainer>
          {WeekDaysList.map( day => (
            <FlexBlock
              key={day}
              justify={'center'}
              width={'100%'}
              p={'12px 0px'}
              borderBottom={`1px solid ${defaultColor}`}
            >
              {day}
            </FlexBlock>
          ) )}
        </CalendarDateListContainer>
      )
    }

    if( renderWeekPattern === 'short' ) {
      return (
        <CalendarDateListContainer>
          {WeekDaysShortList.map( day => (
            <FlexBlock
              key={day + '_short'}
              justify={'center'}
              width={'100%'}
              p={'12px 0px'}
              borderBottom={`1px solid ${defaultColor}`}
            >
              {day}
            </FlexBlock>
          ) )}
        </CalendarDateListContainer>
      )
    }

    return <></>
  }
  return <></>
}
