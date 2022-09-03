import {FC} from 'react'
import {SwitchCalendarMode} from '../Calendar.styled'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {CalendarHeaderSwitchersProps} from '../types'

export const CalendarModeSwitchers: FC<CalendarHeaderSwitchersProps> = ({
																																					layout,
																																					onChange
																																				}) => {
	return (
		<FlexBlock width={'100%'} align={'center'} justify={'center'}>
			<SwitchCalendarMode
				isSelected={layout === 'day'}
				onClick={() => onChange('day')}
			>
				День
			</SwitchCalendarMode>
			<SwitchCalendarMode
				onClick={() => onChange('week')}
				isSelected={layout === 'week'}
			>
				Неделя
			</SwitchCalendarMode>
			<SwitchCalendarMode
				onClick={() => onChange('month')}
				isSelected={layout === 'month'}
			>
				Месяц
			</SwitchCalendarMode>
			<SwitchCalendarMode
				isSelected={layout === 'year'}
				onClick={() => onChange('year')}
			>
				Год
			</SwitchCalendarMode>
		</FlexBlock>
	)
}
