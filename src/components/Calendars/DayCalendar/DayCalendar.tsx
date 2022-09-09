import {FC, useMemo} from 'react'
import {CalendarItem, DayCalendarProps} from '../types'
import {dateToCalendarItem} from '../../../common/calendarSupport/generators'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {DayTaskList} from './TaskList/DayTaskList'
import {CalendarSettingsPanel} from './CalendarSettingsPanel'
import {css} from 'styled-components'

export const DayCalendar: FC<DayCalendarProps> = ({
																										dateItem,
																										onSelectTask,
																										onAddTask,
																									}) => {
	
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
				additionalCss={css`gap: 20px`}
			>
				<FlexBlock width={'100%'} height={'fit-content'}>
					<DayTaskList
						day={dateItem.current.date}
						onAddTask={onAddTask}
						onSelectTask={onSelectTask}
						current={dateItem.current}
					/>
				</FlexBlock>
			</FlexBlock>
		</FlexBlock>
	)
}
