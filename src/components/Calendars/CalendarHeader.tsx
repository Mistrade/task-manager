import { FC, useCallback, useMemo } from 'react'
import { CalendarBodyTitleProps, CalendarMode, WeekListProps } from './types'
import { defaultColor, MonthList, WeekDaysList, WeekDaysShortList } from '../../common/constants'
import dayjs from 'dayjs'
import { ShortChangeCurrentPattern } from '../../common/commonTypes'
import {
  changeDayCurrentHandler,
  changeMonthCurrentHandler,
  changeWeekCurrentHandler,
  changeYearCurrentHandler
} from '../../common/functions'
import { FlexBlock } from '../LayoutComponents/FlexBlock'
import { CalendarDateListContainer, CalendarTitle, SwitchCalendarMode } from './Calendar.styled'
import { Arrow, DoubleArrow } from '../Icons/Icons'

const WeekList: FC<WeekListProps> = ( { renderWeekPattern, current } ) => {
  if( current.layout === 'week' || current.layout === 'month' ) {
    if( renderWeekPattern === 'full' ) {
      return (
        <CalendarDateListContainer>
          {WeekDaysList.map( day => (
            <FlexBlock
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

export const CalendarHeader: FC<CalendarBodyTitleProps> = ( {
                                                              current,
                                                              onChangeCurrent,
                                                              renderWeekPattern
                                                            } ) => {
  const title: string = useMemo( () => {
    switch (current.layout) {
      case 'month':
        return `${MonthList[ current.month ]} ${current.year}г.`
      case 'week':
        const d = dayjs( current.aroundDate )
        return `Неделя ${d.week()}, ${MonthList[ dayjs().set( 'year', d.year() ).week( d.week() ).month() ]} ${d.year()}г.`
      case 'day':
        const day = dayjs( current.date )
        return `${WeekDaysList[ day.weekday() ]}, ${day.format( `DD ${MonthList[ day.month() ]} YYYY` )}г.`
      case 'year':
        return `Календарь на ${current.year} г.`
    }
  }, [current] )

  const onChangeCurrentHandler = useCallback( ( pattern: ShortChangeCurrentPattern = 'today' ) => {
    if( onChangeCurrent ) {
      switch (current.layout) {
        case 'year':
          return onChangeCurrent( changeYearCurrentHandler( current, pattern ), current.layout )
        case 'month':
          return onChangeCurrent( changeMonthCurrentHandler( current, pattern ), current.layout )
        case 'week':
          return onChangeCurrent( changeWeekCurrentHandler( current, pattern ), current.layout )
        case 'day':
          return onChangeCurrent( changeDayCurrentHandler( current, pattern ), current.layout )
      }
    }
  }, [current] )

  const onChangeCurrentLayoutHandler = useCallback( ( newLayout: CalendarMode['layout'] ) => {
    if( onChangeCurrent ) {
      return onChangeCurrent( dayjs().toDate(), newLayout )
    }
  }, [current] )

  return (
    <FlexBlock
      direction={'column'}
      width={'100%'}
      pb={8}
      pt={8}
      bgColor={'#fff'}
    >
      <FlexBlock
        width={'100%'}
        justify={'space-between'}
        align={'center'}
        mb={8}
      >
        <FlexBlock flex={'0 0 33.3%'} justify={'flex-start'} align={'center'}>
          <CalendarTitle>
            {title}
          </CalendarTitle>
        </FlexBlock>
        <FlexBlock flex={'1 1 33.3%'} justify={'center'} align={'center'}>
          <SwitchCalendarMode
            isSelected={current.layout === 'day'}
            onClick={() => onChangeCurrentLayoutHandler( 'day' )}
          >
            День
          </SwitchCalendarMode>
          <SwitchCalendarMode
            onClick={() => onChangeCurrentLayoutHandler( 'week' )}
            isSelected={current.layout === 'week'}
          >
            Неделя
          </SwitchCalendarMode>
          <SwitchCalendarMode
            onClick={() => onChangeCurrentLayoutHandler( 'month' )}
            isSelected={current.layout === 'month'}
          >
            Месяц
          </SwitchCalendarMode>
          <SwitchCalendarMode
            isSelected={current.layout === 'year'}
            onClick={() => onChangeCurrentLayoutHandler( 'year' )}
          >
            Год
          </SwitchCalendarMode>
        </FlexBlock>
        <FlexBlock flex={'1 0 33.3%'} justify={'flex-end'} align={'center'}>
          <DoubleArrow
            onClick={() => onChangeCurrentHandler( '--' )}
            size={20}
            transform={'rotate(180deg)'}
            mr={6}
          />
          <Arrow
            onClick={() => onChangeCurrentHandler( '-' )}
            size={20}
            transform={'rotate(180deg)'}
            mr={6}
          />
          <SwitchCalendarMode
            onClick={() => onChangeCurrentHandler( 'today' )}
          >
            Сегодня
          </SwitchCalendarMode>
          <Arrow
            mr={6}
            size={20}
            onClick={() => onChangeCurrentHandler( '+' )}
          />
          <DoubleArrow
            size={20}
            onClick={() => onChangeCurrentHandler( '++' )}
          />
        </FlexBlock>
      </FlexBlock>
      <WeekList renderWeekPattern={renderWeekPattern} current={current}/>
    </FlexBlock>
  )
}
