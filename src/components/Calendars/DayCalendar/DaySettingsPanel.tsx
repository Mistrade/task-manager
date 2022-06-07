import { FC, useMemo } from 'react'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { disabledColor } from '../../../common/constants'
import { OnSelectDateFromCalendarFn, SmallMonthCalendar } from '../DatePicker/SmallMonthCalendar'
import { CalendarCurrentDay, CalendarCurrentMonth, CalendarItem } from '../types'
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

  const monthInfo = useMemo( () => {
    const monthItemCurrent: CalendarCurrentMonth = {
      layout: 'month',
      month: current.date.getMonth(),
      year: current.date.getFullYear()
    }
    return {
      monthItem: getMonthDays( monthItemCurrent, { useOtherDays: true } ),
      monthCurrent: monthItemCurrent
    }
  }, [current.date] )

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
        monthItem={monthInfo.monthItem}
        cellSize={25}
        date={date?.value}
        onSelectDate={onSelectDate}
        current={monthInfo.monthCurrent}
      />
    </FlexBlock>
  )
}
