import {FC, useMemo} from 'react'
import {CalendarItem, DayCalendarProps} from '../types'
import {dateToCalendarItem} from '../../../common/calendarSupport/generators'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {DayTaskList} from './DayTaskList'
import {sortTask} from '../../../common/dayjs'
import {getTaskListOfDay} from '../../../common/functions'
import {DaySettingsPanel} from './DaySettingsPanel'
import {css} from 'styled-components'

export const DayCalendar: FC<DayCalendarProps> = ( {
                                                     dateItem,
                                                     onChangeCurrent,
                                                     renderWeekPattern,
                                                     taskStorage,
                                                     onSelectTask,
                                                     onAddTask,
                                                     renderTaskCount
                                                   } ) => {
  const day: CalendarItem = useMemo( () => {
    return dateToCalendarItem( dateItem.current.date, {
      month: dateItem.current.date.getMonth(),
      year: dateItem.current.date.getFullYear()
    } )
  }, [dateItem.current.date] )

  return (
    <FlexBlock position={'relative'} width={'100%'} direction={'column'}>
      <FlexBlock
        className={'day--calendar'}
        justify={'flex-start'}
        align={'stretch'}
        wrap={'nowrap'}
        position={'relative'}
        width={'100%'}
        grow={10}
        pt={6}
        additionalCss={css`gap: 20px`}
      >
        <FlexBlock grow={0} shrink={0} maxWidth={'25%'} height={'100%'}>
          <DaySettingsPanel
            onAddTask={onAddTask}
            taskStorage={taskStorage}
            dateItem={dateItem}
            date={day}
            onSelectDate={( data ) => onChangeCurrent && onChangeCurrent( data.value, 'day' )}
          />
        </FlexBlock>
        <FlexBlock width={'100%'} height={'100%'}>
          <DayTaskList
            day={day}
            onAddTask={onAddTask}
            onSelectTask={onSelectTask}
            current={dateItem.current}
            taskList={taskStorage ? sortTask( getTaskListOfDay( day.value, taskStorage ) ) : []}
          />
        </FlexBlock>

      </FlexBlock>
    </FlexBlock>
  )
}
