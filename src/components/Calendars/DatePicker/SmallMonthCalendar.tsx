import { FC, ReactNode, useCallback } from 'react'
import {
  CalendarCurrentMonth,
  CalendarCurrentWeek,
  CalendarDisabledOptions,
  CalendarItem,
  MonthItem,
  TaskStorage,
  WeekItem
} from '../types'
import styled, { css } from 'styled-components'
import { currentColor, defaultColor, MonthList, WeekDaysShortList } from '../../../common/constants'
import { FlexBlock, pxToCssValue, UnitsType } from '../../LayoutComponents/FlexBlock'
import dayjs from 'dayjs'
import { SmallWeekItem } from './SmallWeekItem'

interface SmallCalendarProps extends Pick<StyledProps, 'cellSize'> {
  current: CalendarCurrentMonth,
  currentDate?: Date,
  onSelectDate?: OnSelectDateFromCalendarFn,
  renderNotCurrent?: boolean,
  disabledOptions?: CalendarDisabledOptions,
  monthItem: MonthItem,
  title?: ReactNode,
  onSelectWeek?: ( current: CalendarCurrentWeek ) => void,
  taskStorage?: TaskStorage
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
          key={`weekCount_${week.weekOfYear}`}
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
          key={`weekDay_${item}_short`}
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
                                                              currentDate,
                                                              onSelectDate,
                                                              renderNotCurrent = true,
                                                              title,
                                                              onSelectWeek,
                                                              taskStorage
                                                            } ) => {

  const onClickToWeekCountItem = useCallback( ( weekItem: WeekItem ) => {
    onSelectWeek && onSelectWeek( {
      layout: 'week',
      aroundDate: dayjs().set( 'year', weekItem.year ).set( 'month', weekItem.month ).week( weekItem.weekOfYear ).toDate()
    } )
  }, [onSelectWeek] )

  return (
    <FlexBlock
      justify={'center'}
      align={'center'}
    >
      <FlexBlock direction={'column'} position={'relative'}>

        {title || ( <h2>{MonthList[ monthItem.monthOfYear ]}</h2> )}

        <Grid cellSize={cellSize} rows={monthItem.weeks.length + 1}>
          <div/>
          <WeekDaysLayout
            //Компонент отображающий дни недели
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
          <SmallWeekItem
            //Компонент отображающий даты по неделям
            currentDate={currentDate}
            monthItem={monthItem}
            onSelectDate={onSelectDate}
            taskStorage={taskStorage}
          />
        </Grid>
      </FlexBlock>

    </FlexBlock>

  )
}
