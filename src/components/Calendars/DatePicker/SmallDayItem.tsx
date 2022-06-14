import { FC, useMemo } from 'react'
import { hoverColor } from '../../../common/constants'
import { css } from 'styled-components'
import { getHumanizeWeekDay } from '../../../common/calendarSupport/other'
import dayjs from 'dayjs'
import { addNull, getTaskListOfDay } from '../../../common/functions'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { SmallCalendarDayItemProps } from '../types'
import { DateItem } from './DatePicker.styled'


export const SmallDayItem: FC<SmallCalendarDayItemProps> = ( {
                                                               onSelectDate,
                                                               date,
                                                               weekIndex,
                                                               taskStorage,
                                                               currentDate
                                                             } ) => {
  const taskCount: number = useMemo( () => {
    return taskStorage ? getTaskListOfDay( date, taskStorage ).length : 0
  }, [taskStorage] )

  return (
    <FlexBlock
      justify={'center'}
      align={'center'}
      width={'100%'}
      height={'100%'}
      onClick={() => onSelectDate && onSelectDate( date )}
      style={{ cursor: 'pointer' }}
      bgColor={`${taskCount > 0 && !date.meta.isToday ? hoverColor : ''}`}
      borderRadius={4}
      additionalCss={css`
        grid-column: ${getHumanizeWeekDay( date.value ) + 1};
        grid-row: ${weekIndex + 2};
      `}
    >
      <DateItem
        isCurrent={date.meta.isCurrent}
        isToday={dayjs( date.value ).isSame( currentDate, 'day' ) || false}
      >
        {addNull( date.value.getDate() )}
      </DateItem>
    </FlexBlock>
  )
}
