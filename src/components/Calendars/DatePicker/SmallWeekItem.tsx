import {FC, Fragment} from 'react'
import {SmallDayItem} from './SmallDayItem'
import {SmallMonthCalendarWeekItemProps} from '../types'


export const SmallWeekItem: FC<SmallMonthCalendarWeekItemProps> = ({
																																		 monthItem,
																																		 taskStorage,
																																		 onSelectDate,
																																		 currentDate,
																																		 includesTasks,
																																		 pourWeeks
																																	 }) => {
	return (
		<Fragment>
			{monthItem.weeks.map((week, weekIndex) => (
				<Fragment
					key={`weekItem_year_${week.year}_month_${week.month}_weekNumber_${week.weekOfYear}`}
				>
					{week.days.map((weekDay) => (
						<SmallDayItem
							//Компонент отображающий ячейку даты
							key={`datItem_year_${week.year}_month_${week.month}_week_${week.weekOfYear}_date_${weekDay.value.getDate()}`}
							currentDate={currentDate}
							onSelectDate={onSelectDate}
							taskStorage={taskStorage}
							date={weekDay}
							includesTasks={includesTasks}
							weekIndex={weekIndex}
						/>
					))}
				</Fragment>
			))}
		</Fragment>
	)
}
