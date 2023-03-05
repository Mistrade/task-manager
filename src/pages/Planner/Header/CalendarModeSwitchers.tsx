import {FC} from 'react'
import {SwitchCalendarModeTab} from '../Planner.styled'
import {FlexBlock} from '../../../components/LayoutComponents/FlexBlock'
import {CalendarHeaderSwitchersProps} from '../planner.types'
import {currentColor} from "../../../common/constants";
import {StarsListIcon} from "../../../components/Icons/AppIcon/StarsListIcon";
import {ListIcon} from "../../../components/Icons/AppIcon/ListIcon";
import {CalendarIcon} from "../../../components/Icons/AppIcon/CalendarIcon";

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
				isSelected={layout === 'favorites'}
				onClick={() => onChange('favorites')}
			>
				<FlexBlock align={'center'} gap={6}>
					<StarsListIcon size={24} color={currentColor}/>
					Избранное
				</FlexBlock>
			</SwitchCalendarModeTab>
		</FlexBlock>
	)
}