import { FC } from 'react'
import { WeekCalendarProps, WeekItem } from '../types'
import dayjs from 'dayjs'
import { CalendarCell } from '../Cell'
import { getTaskListOfDay } from '../../../common/functions'
import styled from 'styled-components'
import { defaultColor, disabledColor } from '../../../common/constants'

const WeekContainer = styled( 'div' )`
  position: relative;
  grid-column-start: 1;
  grid-column-end: 8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const DaysContainer = styled( 'div' )`
  display: grid;
  grid-template-columns: repeat(7, minmax(80px, 1fr));
  grid-column-gap: 4px;
  width: 100%;
`

const WeekOfYearTitle = styled( 'h3' )`
  & {
    font-size: 20px;
    width: 100%;
    text-align: left;
    margin-bottom: 8px;
    margin-top: 0;
    padding-left: 8px;
    color: ${disabledColor};
    background-color: #fff;
    z-index: 9;
    position: sticky;
    top: 0;
    left: 0;
    border-radius: 4px;
    cursor: pointer;
    transition: all .3s ease-in-out;
  }

  &:hover {
    background-color: ${disabledColor};
    color: ${defaultColor};
  }
`

export const WeeKCalendar: FC<WeekCalendarProps> = ( {
                                                       weekItem,
                                                       renderTaskCount,
                                                       taskStorage,
                                                       onSelectTask,
                                                       onAddTask,
                                                       onChangeCurrent,
                                                       current
                                                     } ) => {

  const onSelectWeek = ( item: WeekItem ) => {
    if( current.layout === 'month' && onChangeCurrent ) {
      onChangeCurrent( dayjs().set( 'year', current.year ).week( item.weekOfYear ).toDate(), 'week' )
    }
  }

  return (
    <WeekContainer>
      {current.layout === 'month' && (
        <WeekOfYearTitle
          onClick={() => onSelectWeek( weekItem )}
        >
          {weekItem.weekOfYear}
        </WeekOfYearTitle>
      )}
      <DaysContainer>
        {weekItem.days.map( ( day ) => (
          <CalendarCell
            renderTaskCount={renderTaskCount}
            key={day.value.toString()}
            onAddTask={onAddTask}
            value={day}
            onClickToDate={( date ) => onChangeCurrent && onChangeCurrent( date.value, 'day' )}
            tasks={taskStorage ? getTaskListOfDay( day, taskStorage ) : []}
            onSelectTask={onSelectTask}
          />
        ) )}
      </DaysContainer>
    </WeekContainer>
  )
}
