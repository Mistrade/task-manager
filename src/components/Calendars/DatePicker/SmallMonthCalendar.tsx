import { FC, ReactNode, useMemo } from 'react'
import {
  CalendarCurrentMonth,
  CalendarCurrentWeek,
  CalendarDisabledOptions,
  CalendarItem,
  MonthItem, WeekItem
} from '../types'
import styled, { css } from 'styled-components'
import {
  currentColor,
  darkColor,
  defaultColor,
  disabledColor, MonthList,
  WeekDaysShortList
} from '../../../common/constants'
import { FlexBlock, pxToCssValue, UnitsType } from '../../LayoutComponents/FlexBlock'
import { addNull } from '../../../common/functions'
import { CalendarDate } from '../Cell'
import dayjs, { UnitType } from 'dayjs'
import { getHumanizeWeekDay } from '../../../common/calendarSupport/other'
import { getMonthDays } from '../../../common/calendarSupport/getters'

interface SmallCalendarProps extends Pick<StyledProps, 'cellSize'> {
  current: CalendarCurrentMonth,
  date?: Date,
  onSelectDate?: OnSelectDateFromCalendarFn,
  renderNotCurrent?: boolean,
  disabledOptions?: CalendarDisabledOptions,
  monthItem: MonthItem,
  title?: ReactNode,
  onSelectWeek?: ( current: CalendarCurrentWeek ) => void
}

interface StyledProps {
  cellSize?: UnitsType,
  rows: number
}

export type OnSelectDateFromCalendarFn = ( data: CalendarItem ) => void

interface WeekCountLayoutProps extends StyledProps {
  onClickToItem?: ( weekItem: WeekItem ) => void,
  weekItemList: Array<WeekItem>,
  hoverable?: boolean
}

interface WeekDaysLayoutProps extends StyledProps {

}

const Grid = styled( 'div' )<StyledProps>`
  display: grid;
  grid-template-columns: repeat(8, ${props => props.cellSize ? pxToCssValue( props.cellSize ) : '24px'});
  grid-template-rows: repeat(${props => props.rows}, ${props => props.cellSize ? pxToCssValue( props.cellSize ) : '24px'});
  grid-gap: 4px;
  position: relative;
`

const WeekDayGrid = styled( 'div' )<StyledProps>`
  grid-column-start: 2;
  grid-column-end: 9;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(8, ${props => props.cellSize ? pxToCssValue( props.cellSize ) : '24px'});
  grid-gap: 4px;
  position: relative;
`

const WeekGrid = styled( 'div' )<StyledProps>`
  grid-row-start: 2;
  grid-row-end: 8;
  grid-column: 1;
  display: grid;
  grid-template-rows: repeat(auto-fill, ${props => props.cellSize ? pxToCssValue( props.cellSize ) : '24px'});
  grid-gap: 4px;
  position: relative;
`

const DateItem = styled( CalendarDate )`
  & {
    width: 100%;
    height: 100%;
    margin: 0px;
    font-size: 14px;
    color: ${( {
                 isCurrent,
                 isToday
               } ) => isToday ? '#fff' : isCurrent ? darkColor : disabledColor} !important;
  }
`

const WeekCountHoverMixin = css`
  background-color: transparent;
  transition: all .3s ease-in-out;
  cursor: pointer;

  &:hover {
    border-radius: 4px;
    background-color: ${currentColor};
    color: #fff;
    border-right: none;
  }
`

const WeekCountLayout: FC<WeekCountLayoutProps> = ( {
                                                      onClickToItem = undefined,
                                                      weekItemList = [],
                                                      hoverable,
                                                      cellSize,
                                                      rows = 1

                                                    } ) => {
  return (
    <WeekGrid cellSize={cellSize} rows={rows}>
      {weekItemList.map( ( week ) => (
        <FlexBlock
          justify={'center'}
          align={'center'}
          width={'100%'}
          height={'100%'}
          borderRight={`1px solid ${defaultColor}`}
          bgColor={'transparent'}
          additionalCss={hoverable ? WeekCountHoverMixin : undefined}
          onClick={() => onClickToItem && onClickToItem( week )}
        >
          {week.weekOfYear}
        </FlexBlock>
      ) )}
    </WeekGrid>
  )
}

const WeekDaysLayout: FC<WeekDaysLayoutProps> = ( { cellSize, rows } ) => {
  return (
    <WeekDayGrid cellSize={cellSize} rows={rows}>
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
  )
}

export const SmallMonthCalendar: FC<SmallCalendarProps> = ( {
                                                              monthItem,
                                                              cellSize,
                                                              current,
                                                              date,
                                                              onSelectDate,
                                                              renderNotCurrent = true,
                                                              title,
                                                              onSelectWeek
                                                            } ) => {

  const onClickToWeekCountItem = ( weekItem: WeekItem ) => {
    onSelectWeek && onSelectWeek( {
      layout: 'week',
      aroundDate: dayjs().set( 'year', weekItem.year ).set( 'month', weekItem.month ).week( weekItem.weekOfYear ).toDate()
    } )
  }

  return (
    <FlexBlock
      justify={'center'}
      align={'center'}
    >
      <FlexBlock direction={'column'}>

        {title || ( <h2>{MonthList[ monthItem.monthOfYear ]}</h2> )}

        <Grid cellSize={cellSize} rows={monthItem.weeks.length + 1}>
          <div/>
          <WeekDaysLayout
            cellSize={cellSize}
            rows={0}
          />
          <WeekCountLayout
            //Компонент, рисующий сетку с порядковым номером недель
            weekItemList={monthItem.weeks}
            hoverable={!!onSelectWeek}
            rows={1}
            onClickToItem={onClickToWeekCountItem}
            cellSize={cellSize}
          />
          {monthItem.weeks.map( ( week, weekIndex ) => (
            <>
              {week.days.map( ( weekDay ) => (
                <FlexBlock
                  justify={'center'}
                  align={'center'}
                  width={'100%'}
                  height={'100%'}
                  onClick={() => onSelectDate && onSelectDate( weekDay )}
                  style={{ cursor: 'pointer' }}
                  additionalCss={css`
                    grid-column: ${getHumanizeWeekDay( weekDay.value ) + 1};
                    grid-row: ${weekIndex + 2};
                  `}
                >
                  <DateItem
                    isCurrent={weekDay.meta.isCurrent}
                    isToday={dayjs( weekDay.value ).isSame( date, 'day' ) || false}
                  >
                    {addNull( weekDay.value.getDate() )}
                  </DateItem>
                </FlexBlock>
              ) )}
            </>
          ) )}
        </Grid>
      </FlexBlock>

    </FlexBlock>

  )
}
