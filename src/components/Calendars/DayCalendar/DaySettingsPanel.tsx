import { FC } from 'react'
import { FlexBlock } from '../../LayoutComponents/flexBlock'
import { disabledColor } from '../../../common/constants'
import { OnSelectDateFromCalendarFn, SmallMonthCalendar } from '../DatePicker/SmallMonthCalendar'
import { CalendarCurrentDay, CalendarItem } from '../types'
import { getMonthDays } from '../../../common/calendarSupport/getters'

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
      <SmallMonthCalendar
        monthItem={getMonthDays( {
          layout: 'month',
          month: current.date.getMonth(),
          year: current.date.getFullYear()
        }, { useOtherDays: true } )}
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
