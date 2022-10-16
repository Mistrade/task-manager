import {FC} from 'react'
import {SwitchCalendarModeTab} from '../Calendar.styled'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {CalendarHeaderSwitchersProps} from '../types'
import {WaitIcon} from "../../Icons/Icons";
import {currentColor} from "../../../common/constants";
import {StarsListIcon} from "../../Icons/AppIcon/StarsListIcon";
import {ListIcon} from "../../Icons/AppIcon/ListIcon";
import {CalendarIcon} from "../../Icons/AppIcon/CalendarIcon";

export const CalendarModeSwitchers: FC<CalendarHeaderSwitchersProps> = ({
																																					layout,
																																					onChange
																																				}) => {
	return (
		<FlexBlock width={'100%'} align={'flex-end'} justify={'center'}>
			<SwitchCalendarModeTab
				isSelected={layout === 'day'}
				onClick={() => onChange('day')}
			>
				<FlexBlock align={'center'} gap={6}>
					<ListIcon size={24} color={currentColor}/>
					День
				</FlexBlock>
			</SwitchCalendarModeTab>
			<SwitchCalendarModeTab
				onClick={() => onChange('week')}
				isSelected={layout === 'week'}
			>
				<FlexBlock align={'center'} gap={6}>
					<CalendarIcon size={24} color={currentColor}/>
					Неделя
				</FlexBlock>
			</SwitchCalendarModeTab>
			<SwitchCalendarModeTab
				onClick={() => onChange('month')}
				isSelected={layout === 'month'}
			>
				<FlexBlock align={'center'} gap={6}>
					<CalendarIcon size={24} color={currentColor}/>
					Месяц
				</FlexBlock>
			</SwitchCalendarModeTab>
			<SwitchCalendarModeTab
				isSelected={layout === 'year'}
				onClick={() => onChange('year')}
			>
				<FlexBlock align={'center'} gap={6}>
					<CalendarIcon size={24} color={currentColor}/>
					Год
				</FlexBlock>
			</SwitchCalendarModeTab>
			<SwitchCalendarModeTab
				isSelected={layout === 'list'}
				onClick={() => onChange('list')}
			>
				<FlexBlock align={'center'} gap={6}>
					<ListIcon size={24} color={currentColor}/>
					Список
				</FlexBlock>
			</SwitchCalendarModeTab>
			<SwitchCalendarModeTab
				// isSelected={layout === 'year'}
				// onClick={() => onChange('year')}
			>
				<FlexBlock align={'center'} gap={6}>
					<ListIcon size={24} color={currentColor}/>
					3 дня
				</FlexBlock>
			</SwitchCalendarModeTab>
			<SwitchCalendarModeTab
				// isSelected={layout === 'year'}
				// onClick={() => onChange('year')}
			>
				<FlexBlock align={'center'} gap={6}>
					<StarsListIcon size={24} color={currentColor}/>
					Избранное
				</FlexBlock>
			</SwitchCalendarModeTab>
		</FlexBlock>
	)
}
