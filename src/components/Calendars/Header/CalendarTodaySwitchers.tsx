import {FC} from 'react'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {Arrow, DoubleArrow} from '../../Icons/Icons'
import {SwitchCalendarMode} from '../Calendar.styled'
import {CalendarTodaySwitchersProps} from '../types'
import {EmptyButtonStyled} from '../../Buttons/EmptyButton.styled'


export const CalendarTodaySwitchers: FC<CalendarTodaySwitchersProps> = ({onChangeSwitcherState}) => {
	return (
		<FlexBlock width={'100%'} justify={'center'} align={'center'} gap={2}>
			<EmptyButtonStyled
				style={{padding: '4px'}}
				onClick={() => onChangeSwitcherState('--')}
			>
				<DoubleArrow
					size={16}
					transform={'rotate(180deg)'}
				/>
			</EmptyButtonStyled>
			<EmptyButtonStyled
				style={{padding: '4px'}}
				onClick={() => onChangeSwitcherState('-')}
			>
				<Arrow
					size={16}
					transform={'rotate(180deg)'}
				/>
			</EmptyButtonStyled>
			<SwitchCalendarMode
				style={{background: 'transparent'}}
				type={'button'}
				onClick={() => onChangeSwitcherState('today')}
			>
				Сегодня
			</SwitchCalendarMode>
			<EmptyButtonStyled
				style={{padding: '4px'}}
				onClick={() => onChangeSwitcherState('+')}
			>
				<Arrow
					size={16}
				/>
			</EmptyButtonStyled>
			<EmptyButtonStyled
				style={{padding: '4px'}}
				onClick={() => onChangeSwitcherState('++')}
			>
				<DoubleArrow
					size={16}
				/>
			</EmptyButtonStyled>
		</FlexBlock>
	)
}
