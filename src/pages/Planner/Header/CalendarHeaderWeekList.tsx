import {FC} from 'react'
import {CalendarHeaderWeekListProps} from '../planner.types'
import {CalendarDateListContainer} from '../Planner.styled'
import {borderRadiusSize, defaultColor, WeekDaysList, WeekDaysShortList} from '../../../common/constants'
import {FlexBlock} from '../../../components/LayoutComponents/FlexBlock'

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
							borderRadius={`0px 0px ${borderRadiusSize.xs} ${borderRadiusSize.xs}`}
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
							borderRadius={`0px 0px ${borderRadiusSize.xs} ${borderRadiusSize.xs}`}
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
