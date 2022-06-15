import { FC, useEffect, useMemo } from 'react'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { defaultColor, disabledColor } from '../../../common/constants'
import { OnSelectDateFromCalendarFn, SmallMonthCalendar } from '../DatePicker/SmallMonthCalendar'
import {
  CalendarCurrentDay,
  CalendarCurrentMonth,
  CalendarItem,
  DaySettingsPanelProps,
  TaskStorage
} from '../types'
import { getMonthDays } from '../../../common/calendarSupport/getters'
import { css } from 'styled-components'
import { Button } from '../../Buttons/Buttons.styled'
import { SmallCalendarMonthTitle } from '../DatePicker/SmallCalendarMonthTitle'
import dayjs from 'dayjs'
import { dateToCalendarItem } from '../../../common/calendarSupport/generators'


export const DaySettingsPanel: FC<DaySettingsPanelProps> = ( {
                                                               dateItem,
                                                               date,
                                                               onSelectDate,
                                                               taskStorage,
                                                               onAddTask
                                                             } ) => {
  function getTimeZone() {
    const v = /\((.*)\)/.exec( new Date().toString() )
    return v ? v[ 1 ] : ''
  }

  return (
    <FlexBlock
      borderRadius={4}
      direction={'column'}
      grow={0}
      pr={24}
      align={'flex-end'}
      borderRight={`1px solid ${disabledColor}`}
      position={'relative'}
    >
      <FlexBlock
        width={'100%'}
        pb={24}
        justify={'flex-end'}
        bgColor={'#fff'}
        position={'sticky'}
        additionalCss={css`
          top: 0;
          left: 0;
          z-index: 1;
        `}
      >
        <Button onClick={() => {
          if( onAddTask && date ) {
            const d = dayjs( date.value ).isBefore( new Date(), 'date' )
            if( d ) {
              const newD = dayjs()

              const context = {
                month: newD.month(),
                year: newD.year()
              }

              const r = dateToCalendarItem( newD.toDate(), context )
              return onAddTask( r )
            }

            onAddTask && date && onAddTask( date )
          }
        }}>
          Добавить событие
        </Button>
      </FlexBlock>
      <SmallMonthCalendar
        monthItem={dateItem.settingPanel.monthItem}
        cellSize={25}
        title={
          <SmallCalendarMonthTitle
            monthItem={dateItem.settingPanel.monthItem}
          />
        }
        taskStorage={taskStorage}
        currentDate={date?.value}
        onSelectDate={onSelectDate}
        current={dateItem.settingPanel.monthCurrent}
      />
      <FlexBlock mt={24} justify={'flex-end'} width={'100%'}>
        <p style={{ textAlign: 'right' }}>
          {getTimeZone()}
        </p>
      </FlexBlock>
    </FlexBlock>
  )
}
