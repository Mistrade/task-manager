import { FC } from 'react'
import { FlexBlock } from '../../LayoutComponents/flexBlock'
import { disabledColor } from '../../../common/constants'
import { OnSelectDateFromCalendarFn, SmallCalendar } from '../DatePicker/SmallCalendar'
import { CalendarCurrentDay, CalendarItem } from '../types'

interface DaySettingsPanelProps {
  current: CalendarCurrentDay,
  date?: CalendarItem,
  onSelectDate?: OnSelectDateFromCalendarFn
}

export const DaySettingsPanel: FC<DaySettingsPanelProps> = ( {
                                                               current,
                                                               date,
                                                               onSelectDate
                                                             } ) => {


  return (
    <FlexBlock
      borderRadius={4}
      bgColor={disabledColor}
      direction={'column'}
      grow={3}
      p={12}
      width={'100%'}
    >
      <SmallCalendar
        cellSize={25}
        date={date?.value}
        onSelectDate={onSelectDate}
        current={{
          layout: 'month',
          month: current.date.getMonth(),
          year: current.date.getFullYear()
        }}
      />
    </FlexBlock>
  )
}
