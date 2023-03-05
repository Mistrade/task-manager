import {FC} from 'react'
import {DayCalendarProps} from '../../planner.types'
import {FlexBlock} from '../../../../components/LayoutComponents/FlexBlock'
import {DayTaskList} from './TaskList/DayTaskList'
import {css} from 'styled-components'

export const DayCalendar: FC<DayCalendarProps> = ({
																										dateItem,
																										onSelectTask,
																										onAddTask,
																									}) => {
	
	return (
		<FlexBlock
			position={'relative'}
			width={'100%'}
			direction={'column'}
			className={'day--calendar'}
			justify={'flex-start'}
			align={'stretch'}
			wrap={'nowrap'}
			grow={10}
			mt={4}
			mb={4}
			additionalCss={css`gap: 20px`}
			height={'100%'}
		>
			<DayTaskList
				day={dateItem.current.date}
				onAddTask={onAddTask}
				onSelectTask={onSelectTask}
				current={dateItem.current}
			/>
		</FlexBlock>
	)
}
