import { FC, useMemo } from 'react'
import { CalendarCurrentMonth, CalendarDisabledOptions, CalendarItem } from '../types'
import { getPickerDates } from '../../../common/dayjs'
import styled from 'styled-components'
import { defaultColor, disabledColor, WeekDaysShortList } from '../../../common/constants'
import { FlexBlock, pxToCssValue, UnitsType } from '../../LayoutComponents/flexBlock'
import { addNull } from '../../../common/functions'
import { CalendarDate } from '../cell'
import dayjs, { UnitType } from 'dayjs'

const Grid = styled( 'div' )<StyledProps>`
  display: grid;
  grid-template-columns: repeat(8, ${props => props.cellSize ? pxToCssValue(props.cellSize) : '24px'});
  grid-template-rows: repeat(7, ${props => props.cellSize ? pxToCssValue(props.cellSize) : '24px'});
  grid-gap: 4px;
  position: relative;
`

const WeekDayGrid = styled( 'div' )<StyledProps>`
  grid-column-start: 2;
  grid-column-end: 9;
  grid-row-start: 1;
  grid-row-end: 2;
  display: grid;
  grid-template-columns: repeat(8, ${props => props.cellSize ? pxToCssValue(props.cellSize) : '24px'});
  grid-row: 1;
  grid-gap: 4px;
  position: relative;
`

const WeekGrid = styled( 'div' )<StyledProps>`
  grid-row-start: 2;
  grid-row-end: 8;
  grid-column-start: 1;
  grid-column-end: 2;
  display: grid;
  grid-template-rows: repeat(6, ${props => props.cellSize ? pxToCssValue(props.cellSize) : '24px'});
  grid-column: 1;
  grid-gap: 4px;
  position: relative;
`

const DateItem = styled( CalendarDate )`
  & {
    width: 100%;
    height: 100%;
    margin: 0px;
    font-size: 14px;
    color: ${props => props.isToday ? '#fff' : props.isCurrent ? defaultColor : disabledColor};
  }
`

interface SmallCalendarProps extends StyledProps {
  current: CalendarCurrentMonth,
  date?: Date,
  onSelectDate?: OnSelectDateFromCalendarFn,
  renderNotCurrent?: boolean,
  disabledOptions?: CalendarDisabledOptions,

}

interface StyledProps {
  cellSize?: UnitsType
}

export type OnSelectDateFromCalendarFn = ( data: CalendarItem ) => void

export const SmallCalendar: FC<SmallCalendarProps> = ( {
                                                         cellSize,
                                                         current,
                                                         date,
                                                         onSelectDate,
                                                         renderNotCurrent = true
                                                       } ) => {
  const dayList = useMemo( () => {
    return getPickerDates( current, {} )
  }, [current.month, current.year] )

  return (
    <Grid cellSize={cellSize}>
      <div/>
      <WeekDayGrid cellSize={cellSize}>
        {WeekDaysShortList.map( item => (
          <FlexBlock
            justify={'center'}
            align={'center'}
            width={'100%'}
            height={'100%'}
            borderBottom={`1px solid ${defaultColor}`}
          >
            {item}
          </FlexBlock>
        ) )}
      </WeekDayGrid>
      <WeekGrid cellSize={cellSize}>
        {dayList.map( week => (
          <FlexBlock
            justify={'center'}
            align={'center'}
            width={'100%'}
            height={'100%'}
            borderRight={`1px solid ${defaultColor}`}
          >
            {week.weekOfYear}
          </FlexBlock>
        ) )}
      </WeekGrid>
      {dayList.map( week => (
        <>
          {week.days.map( weekDay => (
            <>
              {( !renderNotCurrent && !weekDay.meta.isCurrent ) ? (
                <div/>
              ) : (
                <FlexBlock
                  justify={'center'}
                  align={'center'}
                  width={'100%'}
                  height={'100%'}
                  onClick={() => onSelectDate && onSelectDate( weekDay )}
                  style={{ cursor: 'pointer' }}
                >
                  <DateItem
                    isCurrent={weekDay.meta.isCurrent}
                    isToday={dayjs( weekDay.value ).isSame( date, 'day' ) || false}
                  >
                    {addNull( weekDay.value.getDate() )}
                  </DateItem>
                </FlexBlock>
              )}
            </>
          ) )}
        </>
      ) )}
    </Grid>
  )
}
