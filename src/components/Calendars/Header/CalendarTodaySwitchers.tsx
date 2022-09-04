import {FC} from 'react'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {Arrow, DoubleArrow} from '../../Icons/Icons'
import {SwitchCalendarMode} from '../Calendar.styled'
import {CalendarTodaySwitchersProps} from '../types'
import {EmptyButtonStyled} from '../../Buttons/EmptyButton.styled'


export const CalendarTodaySwitchers: FC<CalendarTodaySwitchersProps> = ({onChange}) => {
	return (
		<FlexBlock width={'100%'} justify={'flex-end'} align={'center'} gap={6}>
			<EmptyButtonStyled
				onClick={() => onChange('--')}
			>
				<DoubleArrow
					size={20}
					transform={'rotate(180deg)'}
				/>
			</EmptyButtonStyled>
			<EmptyButtonStyled
				onClick={() => onChange('-')}
			>
				<Arrow
					size={20}
					transform={'rotate(180deg)'}
				/>
			</EmptyButtonStyled>
			<SwitchCalendarMode
				type={'button'}
				onClick={() => onChange('today')}
			>
				Сегодня
			</SwitchCalendarMode>
			<EmptyButtonStyled
				onClick={() => onChange('+')}
			>
				<Arrow
					size={20}
				/>
			</EmptyButtonStyled>
			<EmptyButtonStyled
				onClick={() => onChange('++')}
			>
				<DoubleArrow
					size={20}
				/>
			</EmptyButtonStyled>
		</FlexBlock>
	)
}
