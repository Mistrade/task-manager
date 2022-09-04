import {FC} from 'react'
import {SwitchCalendarModeTab} from '../Calendar.styled'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {CalendarHeaderSwitchersProps} from '../types'

export const CalendarModeSwitchers: FC<CalendarHeaderSwitchersProps> = ({
																																					layout,
																																					onChange
																																				}) => {
	return (
		<FlexBlock width={'100%'} align={'center'} justify={'center'}>
			<SwitchCalendarModeTab
				isSelected={layout === 'day'}
				onClick={() => onChange('day')}
			>
				День
			</SwitchCalendarModeTab>
			<SwitchCalendarModeTab
				onClick={() => onChange('week')}
				isSelected={layout === 'week'}
			>
				Неделя
			</SwitchCalendarModeTab>
			<SwitchCalendarModeTab
				onClick={() => onChange('month')}
				isSelected={layout === 'month'}
			>
				Месяц
			</SwitchCalendarModeTab>
			<SwitchCalendarModeTab
				isSelected={layout === 'year'}
				onClick={() => onChange('year')}
			>
				Год
			</SwitchCalendarModeTab>
		</FlexBlock>
	)
}
