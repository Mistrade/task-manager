import {FC} from 'react'
import {SwitchCalendarModeTab} from '../Calendar.styled'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {CalendarHeaderSwitchersProps} from '../types'
import {WaitIcon} from "../../Icons/Icons";
import {defaultColor} from "../../../common/constants";

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
			<SwitchCalendarModeTab
				isSelected={layout === 'list'}
				onClick={() => onChange('list')}
			>
				<FlexBlock align={'center'} gap={6}>
					<WaitIcon size={15} color={defaultColor}/>
					Список (dev)
				</FlexBlock>
			</SwitchCalendarModeTab>
			<SwitchCalendarModeTab
				// isSelected={layout === 'year'}
				// onClick={() => onChange('year')}
			>
				<FlexBlock align={'center'} gap={6}>
					<WaitIcon size={15} color={defaultColor}/>
					3 дня (Dev)
				</FlexBlock>
			</SwitchCalendarModeTab>
		</FlexBlock>
	)
}
