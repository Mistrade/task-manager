import { FC, useMemo } from 'react'
import { CalendarItem, DayCalendarProps } from '../types'
import { dateToCalendarItem } from '../../../common/calendarSupport/generators'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { DayTaskList } from './DayTaskList'
import { sortTask } from '../../../common/dayjs'
import { getTaskListOfDay } from '../../../common/functions'
import { DaySettingsPanel } from './DaySettingsPanel'

export const DayCalendar: FC<DayCalendarProps> = ( {
                                                     current,
                                                     onChangeCurrent,
                                                     renderWeekPattern,
                                                     taskStorage,
                                                     onSelectTask,
                                                     onAddTask,
                                                     renderTaskCount
                                                   } ) => {
  const day: CalendarItem = useMemo( () => {
    return dateToCalendarItem( current.date, {
      month: current.date.getMonth(),
      year: current.date.getFullYear()
    } )
  }, [current.date] )

  return (
    <FlexBlock
      className={'day--calendar'}
      justify={'flex-start'}
      align={'stretch'}
      wrap={'nowrap'}
      width={'100%'}
      grow={10}
      mt={24}
    >
      <FlexBlock flex={'1 0 calc(50% - 16px)'} height={'100%'} mr={16}>
        <DayTaskList
          day={day}
          onSelectTask={onSelectTask}
          current={current}
          taskList={taskStorage ? sortTask( getTaskListOfDay( day, taskStorage ) ) : []}
        />
      </FlexBlock>
      <FlexBlock flex={'1 0 calc(50% - 16px)'} ml={16}>
        <DaySettingsPanel
          current={current}
          date={day}
          onSelectDate={( data ) => onChangeCurrent && onChangeCurrent( data.value, 'day' )}
        />
      </FlexBlock>
    </FlexBlock>
  )
}
