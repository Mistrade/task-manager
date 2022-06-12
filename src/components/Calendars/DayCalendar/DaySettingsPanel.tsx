import { FC, useMemo } from 'react'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { disabledColor } from '../../../common/constants'
import { OnSelectDateFromCalendarFn, SmallMonthCalendar } from '../DatePicker/SmallMonthCalendar'
import {
  CalendarCurrentDay,
  CalendarCurrentMonth,
  CalendarItem,
  DaySettingsPanelProps,
  TaskStorage
} from '../types'
import { getMonthDays } from '../../../common/calendarSupport/getters'


export const DaySettingsPanel: FC<DaySettingsPanelProps> = ( {
                                                               current,
                                                               date,
                                                               onSelectDate,
                                                               taskStorage
                                                             } ) => {

  const monthInfo = useMemo( () => {
    //TODO Месяц пересчитывается при изменении каждого дня, надо добавить проверки на изменения месяца/года, прежде чем выполнять формирование календаря
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
        taskStorage={taskStorage}
        currentDate={date?.value}
        onSelectDate={onSelectDate}
        current={monthInfo.monthCurrent}
      />
    </FlexBlock>
  )
}
