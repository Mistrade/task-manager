import {FC} from 'react'
import {CalendarHeaderWeekListProps} from '../types'
import {CalendarDateListContainer} from '../Calendar.styled'
import {defaultColor, WeekDaysList, WeekDaysShortList} from '../../../common/constants'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'

export const CalendarHeaderWeekList: FC<CalendarHeaderWeekListProps> = ({
																																					renderWeekPattern,
																																					current
																																				}) => {
	if (current.layout === 'week' || current.layout === 'month') {
		if (renderWeekPattern === 'full') {
			return (
				<CalendarDateListContainer rowsCount={1}>
					{WeekDaysList.map(day => (
						<FlexBlock
							key={day}
							justify={'center'}
							width={'100%'}
							p={'12px 0px'}
							mb={6}
							borderBottom={`1px solid ${defaultColor}`}
							borderRadius={'0px 0px 4px 4px'}
						>
							{day}
						</FlexBlock>
					))}
				</CalendarDateListContainer>
			)
		}
		
		if (renderWeekPattern === 'short') {
			return (
				<CalendarDateListContainer rowsCount={1}>
					{WeekDaysShortList.map(day => (
						<FlexBlock
							key={day + '_short'}
							justify={'center'}
							width={'100%'}
							p={'12px 0px'}
							mb={6}
							borderBottom={`1px solid ${defaultColor}`}
							borderRadius={'0px 0px 4px 4px'}
						>
							{day}
						</FlexBlock>
					))}
				</CalendarDateListContainer>
			)
		}
		
		return <></>
	}
	return <></>
}
