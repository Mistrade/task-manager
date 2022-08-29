import {FC, useCallback} from 'react'
import {CalendarItem, WeekCalendarProps, WeekItem} from '../types'
import dayjs from 'dayjs'
import {CalendarCell} from '../Cell'
import {getTaskListOfDay} from '../../../common/functions'
import styled from 'styled-components'
import {defaultColor, disabledColor} from '../../../common/constants'

const WeekContainer = styled('div')`
  position: relative;
  grid-column-start: 1;
  grid-column-end: 8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const DaysContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, minmax(80px, 1fr));
  grid-column-gap: 4px;
  width: 100%;
`

const WeekOfYearTitle = styled('h3')`
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
    //border-radius: 4px;
    cursor: pointer;
    transition: all .3s ease-in-out;
  }

  &:hover {
    background-color: ${disabledColor};
    color: ${defaultColor};
    border-radius: 4px;
  }
`

export const WeeKCalendar: FC<WeekCalendarProps> = ({
																											weekItem,
																											renderTaskCount,
																											taskStorage,
																											onSelectTask,
																											onAddTask,
																											onChangeCurrent,
																											current
																										}) => {
	
	const onSelectWeek = useCallback((item: WeekItem) => {
		if (current.layout === 'month' && onChangeCurrent) {
			onChangeCurrent(dayjs().set('year', current.year).week(item.weekOfYear).toDate(), 'week')
		}
	}, [onChangeCurrent, current.layout])
	
	const onClickToDate = useCallback((date: CalendarItem) => {
		onChangeCurrent && onChangeCurrent(date.value, 'day')
	}, [onChangeCurrent])
	
	return (
		<WeekContainer>
			week container
			{JSON.stringify(current)}
			{current.layout === 'month' && (
				<WeekOfYearTitle
					onClick={() => onSelectWeek(weekItem)}
				>
					{weekItem.weekOfYear}
				</WeekOfYearTitle>
			)}
			<DaysContainer>
				{weekItem.days.map((day) => (
					<CalendarCell
						renderTaskCount={renderTaskCount}
						key={`date_year_${weekItem.year}_month_${weekItem.month}_${day.value.getDate()}`}
						onAddTask={onAddTask}
						value={day}
						onClickToDate={onClickToDate}
						tasks={taskStorage ? getTaskListOfDay(day.value, taskStorage) : []}
						onSelectTask={onSelectTask}
					/>
				))}
			</DaysContainer>
		</WeekContainer>
	)
}
