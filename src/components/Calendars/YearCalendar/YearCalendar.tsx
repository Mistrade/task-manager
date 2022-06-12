import { FC } from 'react'
import { YearCalendarProps } from '../types'
import { SmallMonthCalendar } from '../DatePicker/SmallMonthCalendar'
import styled from 'styled-components'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { currentColor, MonthList } from '../../../common/constants'

const YearGrid = styled( 'div' )`
  display: grid;
  grid-template-columns: repeat(4, minmax(20px, 1fr));
  grid-gap: 20px;
  grid-template-rows: 250px 250px 250px;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  position: relative;
`

export const YearCalendar: FC<YearCalendarProps> = ( {
                                                       yearItem,
                                                       taskStorage,
                                                       onChangeCurrent,
                                                       current
                                                     } ) => {

  return (
    <FlexBlock mt={32} mb={32} width={'100%'}>
      <YearGrid>
        {yearItem.months.map( ( monthItem ) => {
          return (
            <FlexBlock
              key={`monthItem_year_${monthItem.year}_month_${monthItem.monthOfYear}`}
            >
              <SmallMonthCalendar
                taskStorage={taskStorage}
                title={(
                  <FlexBlock
                    justify={'flex-start'}
                    width={'100%'}
                    pl={28}
                    style={{ color: currentColor, fontSize: 18, cursor: 'pointer' }}
                    mb={8}
                    onClick={() => {
                      onChangeCurrent && onChangeCurrent( new Date( monthItem.year, monthItem.monthOfYear, 1 ), 'month' )
                    }}
                  >
                    {MonthList[ monthItem.monthOfYear ]?.toLowerCase()}
                  </FlexBlock>
                )}
                onSelectDate={( data ) => {
                  onChangeCurrent && onChangeCurrent( data.value, 'day' )
                }}
                onSelectWeek={( current ) => onChangeCurrent && onChangeCurrent( current.aroundDate, 'week' )}
                monthItem={monthItem}
                current={{
                  layout: 'month',
                  month: monthItem.monthOfYear,
                  year: monthItem.year
                }}
              />
            </FlexBlock>
          )
        } )}
      </YearGrid>
    </FlexBlock>
  )
}
