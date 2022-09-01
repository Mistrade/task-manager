import {FC} from 'react'
import {MonthCalendarProps} from '../types'
import {CalendarDateListContainer, CalendarDesktopContainer} from '../Calendar.styled'
import {WeeKCalendar} from '../WeekCalendar/WeekCalendar'

export const MonthCalendar: FC<MonthCalendarProps> = ( {
                                                         monthItem,
                                                         current,
                                                         onAddTask,
                                                         onSelectTask,
                                                         onChangeCurrent,
                                                         renderTaskCount,
                                                         taskStorage
                                                       } ) => {

  return (
    <CalendarDesktopContainer>
      <CalendarDateListContainer rowsCount={6}>
        {monthItem.weeks.map( ( week ) => (
          <WeeKCalendar
            key={`monthCalendarWeek_year_${monthItem.year}_month_${monthItem.monthOfYear}_week_${week.weekOfYear}`}
            weekItem={week}
            current={current}
            onChangeCurrent={onChangeCurrent}
            onSelectTask={onSelectTask}
            renderTaskCount={renderTaskCount}
            onAddTask={onAddTask}
            taskStorage={taskStorage}
          />
        ) )}
      </CalendarDateListContainer>
    </CalendarDesktopContainer>
  )
}
