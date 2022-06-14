import {
  CalendarDisabledOptions,
  CalendarMode,
  CalendarProps, DateItem,
  MonthItem,
  TaskStorage,
  WeekItem,
  YearItem
} from './types'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { CurrentObserver, getTaskStorage } from '../../common/functions'
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
import { css } from 'styled-components'
import {
  defaultColor,
  defaultDateItem,
  defaultMonthItem,
  defaultWeekItem, defaultYearItem
} from '../../common/constants'
import { Interceptor } from './Interceptor'

export const Calendar: FC<CalendarProps> = ( {
                                               initialCurrent,
                                               disabledOptions = {},
                                               renderWeekPattern = 'full',
                                               taskList
                                             } ) => {
  const calendar = useCalendar( initialCurrent )

  const taskStorage: TaskStorage | undefined = useMemo( () => {
    return taskList ? getTaskStorage( taskList ) : undefined
  }, [taskList?.length] )

  const [yearItem, setYearItem] = useState<YearItem>( defaultYearItem )
  const [monthItem, setMonthItem] = useState<MonthItem>( defaultMonthItem )
  const [weekItem, setWeekItem] = useState<WeekItem>( defaultWeekItem )
  const [dateItem, setDateItem] = useState<DateItem>( defaultDateItem )


  useEffect( () => {
    changeCurrentObserver( calendar.current, disabledOptions )
  }, [calendar.current, disabledOptions] )

  const changeCurrentObserver = async ( current: CalendarMode, disabledOptions?: CalendarDisabledOptions ) => {
    const { layout } = current

    switch (layout) {
      case 'year':
        return setYearItem( prev => CurrentObserver.year( prev, current, disabledOptions ) )
      case 'month':
        return setMonthItem( prev => CurrentObserver.month( prev, current, disabledOptions ) )
      case 'week':
        return setWeekItem( prev => CurrentObserver.week( prev, current, disabledOptions ) )
      case 'day':
        return setDateItem( prev => CurrentObserver.date( prev, current, disabledOptions ) )
    }
  }

  return (
    <FlexBlock
      position={'relative'}
      align={'flex-start'}
      direction={'column'}
      grow={3}
      className={'Calendar__container'}
      width={'100%'}
      minHeight={800}
      maxHeight={'100vh'}
      additionalCss={css`
        & {
            // border: 1px solid ${defaultColor};
            // box-shadow: 0px 0px 4px ${defaultColor};
          //border-radius: 4px;
          padding: 24px 20px 0px 20px;
        }
      `}
    >
      <CalendarHeader
        current={calendar.current}
        onChangeCurrent={calendar.onChangeCurrent}
        renderWeekPattern={renderWeekPattern}
      />

      <FlexBlock
        position={'relative'}
        maxHeight={`calc(100vh-${calendar.current.layout === 'month' || calendar.current.layout === 'week' ? '120px' : '70px'})`}
        overflow={'scroll'}
        width={'100%'}
      >
        {calendar.current.layout === 'year' ? (
          <Interceptor
            shouldRenderChildren={yearItem.year > 0 && yearItem.months.length > 0}
          >
            <YearCalendar
              yearItem={yearItem}
              current={calendar.current}
              taskStorage={taskStorage}
              onChangeCurrent={calendar.onChangeCurrent}
            />
          </Interceptor>
        ) : calendar.current.layout === 'month' ? (
          <Interceptor
            shouldRenderChildren={monthItem.monthOfYear >= 0 && monthItem.weeks.length > 0}
          >
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
          </Interceptor>
        ) : calendar.current.layout === 'week' ? (
          <Interceptor
            shouldRenderChildren={weekItem.weekOfYear > 0 && weekItem.days.length > 0}
          >
            <WeeKCalendar
              onChangeCurrent={calendar.onChangeCurrent}
              current={calendar.current}
              weekItem={weekItem}
              renderTaskCount={'all'}
              taskStorage={taskStorage}
              onAddTask={calendar.onAddTask}
              onSelectTask={calendar.onSelectTask}
            />
          </Interceptor>
        ) : calendar.current.layout === 'day' ? (
          <Interceptor
            shouldRenderChildren={dateItem.settingPanel.monthItem.weeks.length > 0}
          >
            <DayCalendar
              dateItem={dateItem}
              onSelectTask={calendar.onSelectTask}
              onChangeCurrent={calendar.onChangeCurrent}
              taskStorage={taskStorage}
              renderTaskCount={'all'}
            />
          </Interceptor>
        ) : <></>}
      </FlexBlock>
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
