import {FC} from 'react'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {Arrow, DoubleArrow} from '../../Icons/Icons'
import {SwitchCalendarMode} from '../Calendar.styled'
import {CalendarTodaySwitchersProps} from '../types'


export const CalendarTodaySwitchers: FC<CalendarTodaySwitchersProps> = ( { onChange } ) => {
  return (
    <FlexBlock width={'100%'} justify={'flex-end'} align={'center'}>
      <DoubleArrow
        onClick={() => onChange( '--' )}
        size={20}
        transform={'rotate(180deg)'}
        mr={6}
      />
      <Arrow
        onClick={() => onChange( '-' )}
        size={20}
        transform={'rotate(180deg)'}
        mr={6}
      />
      <SwitchCalendarMode
        type={'button'}
        onClick={() => onChange( 'today' )}
      >
        Сегодня
      </SwitchCalendarMode>
      <Arrow
        mr={6}
        size={20}
        onClick={() => onChange( '+' )}
      />
      <DoubleArrow
        size={20}
        onClick={() => onChange( '++' )}
      />
    </FlexBlock>
  )
}
