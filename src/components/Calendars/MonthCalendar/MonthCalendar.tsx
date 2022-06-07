import { FC } from 'react'
import { MonthCalendarProps } from '../types'
import { CalendarDateListContainer, CalendarDesktopContainer } from '../Calendar.styled'
import { WeeKCalendar } from '../WeekCalendar/WeekCalendar'

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
      <CalendarDateListContainer>
        {monthItem.weeks.map( ( week ) => (
          <WeeKCalendar
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
