import {FC} from 'react'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {Arrow, DoubleArrow} from '../../Icons/Icons'
import {SwitchCalendarMode} from '../Calendar.styled'
import {CalendarTodaySwitchersProps} from '../types'
import {EmptyButtonStyled} from '../../Buttons/EmptyButton.styled'


export const CalendarTodaySwitchers: FC<CalendarTodaySwitchersProps> = ({onChange}) => {
	return (
		<FlexBlock width={'100%'} justify={'flex-start'} align={'center'} gap={2}>
			<EmptyButtonStyled
				style={{padding: '4px'}}
				onClick={() => onChange('--')}
			>
				<DoubleArrow
					size={16}
					transform={'rotate(180deg)'}
				/>
			</EmptyButtonStyled>
			<EmptyButtonStyled
				style={{padding: '4px'}}
				onClick={() => onChange('-')}
			>
				<Arrow
					size={16}
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
				style={{padding: '4px'}}
				onClick={() => onChange('+')}
			>
				<Arrow
					size={16}
				/>
			</EmptyButtonStyled>
			<EmptyButtonStyled
				style={{padding: '4px'}}
				onClick={() => onChange('++')}
			>
				<DoubleArrow
					size={16}
				/>
			</EmptyButtonStyled>
		</FlexBlock>
	)
}
