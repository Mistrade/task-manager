import {FC} from 'react'
import {SwitchCalendarMode} from '../Calendar.styled'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {CalendarHeaderSwitchersProps} from '../types'

export const CalendarModeSwitchers: FC<CalendarHeaderSwitchersProps> = ( {
                                                                           current,
                                                                           onChange
                                                                         } ) => {
  return (
    <FlexBlock width={'100%'} align={'center'} justify={'center'}>
      <SwitchCalendarMode
        isSelected={current.layout === 'day'}
        onClick={() => onChange( 'day' )}
      >
        День
      </SwitchCalendarMode>
      <SwitchCalendarMode
        onClick={() => onChange( 'week' )}
        isSelected={current.layout === 'week'}
      >
        Неделя
      </SwitchCalendarMode>
      <SwitchCalendarMode
        onClick={() => onChange( 'month' )}
        isSelected={current.layout === 'month'}
      >
        Месяц
      </SwitchCalendarMode>
      <SwitchCalendarMode
        isSelected={current.layout === 'year'}
        onClick={() => onChange( 'year' )}
      >
        Год
      </SwitchCalendarMode>
    </FlexBlock>
  )
}
