import { CalendarMode, CalendarProps, MonthItem, TaskStorage, WeekItem, YearItem } from './types'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { getTaskStorage } from '../../common/functions'
import { useCalendar } from '../hooks/useCalendar'
import { getMonthDays, getWeekDays, getYearDays } from '../../common/calendarSupport/getters'
import { YearCalendar } from './YearCalendar/YearCalendar'
import { WeeKCalendar } from './WeekCalendar/WeekCalendar'
import { DayCalendar } from './DayCalendar/DayCalendar'
import { MonthCalendar } from './MonthCalendar/MonthCalendar'
import { CalendarHeader } from './Header/CalendarHeader'
import { TaskInfoModal } from './CalendarModals/TaskInfoModal'
import { AddTaskModal } from './CalendarModals/AddTaskModal'
import { FlexBlock } from '../LayoutComponents/FlexBlock'

export const Calendar: FC<CalendarProps> = ( {
                                               initialCurrent,
                                               disabledOptions = {},
                                               renderWeekPattern = 'full',
                                               taskList
                                             } ) => {
  const calendar = useCalendar( initialCurrent )

  const taskStorage: TaskStorage | undefined = useMemo( () => {
    console.log( 'taskStorage' )
    return taskList ? getTaskStorage( taskList ) : undefined
  }, [taskList] )

  const [yearItem, setYearItem] = useState<YearItem>( {
    year: -1,
    months: []
  } )
  const [monthItem, setMonthItem] = useState<MonthItem>( {
    monthOfYear: -1,
    year: -1,
    weeks: []
  } )
  const [weekItem, setWeekItem] = useState<WeekItem>( {
    weekOfYear: -1,
    month: -1,
    year: -1,
    days: []
  } )


  useEffect( () => {
    changeCurrentObserver( calendar.current )
  }, [calendar.current] )

  const changeCurrentObserver = useCallback( ( current: CalendarMode ) => {
    const { layout } = current

    if( layout === 'year' ) {
      setYearItem( prev => {
        const prevYear = prev.year

        if( current.year !== prevYear ) {
          return getYearDays( current, { useOtherDays: false, disabled: disabledOptions } )
        }

        return prev
      } )
    }

    if( layout === 'month' ) {
      setMonthItem( prev => {
        const prevMonth = prev.monthOfYear
        const prevYear = prev.year

        if( prevMonth !== current.month || prevYear !== current.year ) {
          return getMonthDays( current, { useOtherDays: true, disabled: disabledOptions } )
        }

        return prev
      } )
    }

    if( layout === 'week' ) {
      setWeekItem( prev => {
        const { aroundDate } = current
        const curDate = dayjs( aroundDate )
        const c = {
          y: curDate.year(),
          m: curDate.month(),
          w: curDate.week()
        }

        if( prev.year !== c.y || prev.month !== c.m || prev.weekOfYear !== c.w ) {
          return getWeekDays(
            current,
            { year: c.y, month: c.m },
            { useOtherDays: true, disabled: disabledOptions }
          )
        }

        return prev
      } )
    }
  }, [calendar.current] )

  return (
    <FlexBlock position={'relative'} align={'flex-start'} direction={'column'} grow={3}>
      <CalendarHeader
        current={calendar.current}
        onChangeCurrent={calendar.onChangeCurrent}
        renderWeekPattern={renderWeekPattern}
      />
      {calendar.current.layout === 'year' ? (
        <YearCalendar
          yearItem={yearItem}
          current={calendar.current}
          taskStorage={taskStorage}
          onChangeCurrent={calendar.onChangeCurrent}
        />
      ) : calendar.current.layout === 'month' ? (
        <MonthCalendar
          onChangeCurrent={calendar.onChangeCurrent}
          renderWeekPattern={renderWeekPattern}
          renderTaskCount={5}
          current={calendar.current}
          monthItem={monthItem}
          taskStorage={taskStorage}
          onAddTask={calendar.onAddTask}
          onSelectTask={calendar.onSelectTask}
        />
      ) : calendar.current.layout === 'week' ? (
        <WeeKCalendar
          onChangeCurrent={calendar.onChangeCurrent}
          current={calendar.current}
          weekItem={weekItem}
          renderTaskCount={'all'}
          taskStorage={taskStorage}
          onAddTask={calendar.onAddTask}
          onSelectTask={calendar.onSelectTask}
        />
      ) : calendar.current.layout === 'day' ? (
        <DayCalendar
          onSelectTask={calendar.onSelectTask}
          onChangeCurrent={calendar.onChangeCurrent}
          current={calendar.current}
          taskStorage={taskStorage}
          renderTaskCount={'all'}
        />
      ) : <></>}
      <AddTaskModal
        date={calendar.addTaskDate}
        onClose={() => calendar.setAddTaskDate( null )}
      />
      <TaskInfoModal
        selectedTask={calendar.selectedTask}
        onClose={() => calendar.setSelectedTask( null )}
      />
    </FlexBlock>
  )
}
