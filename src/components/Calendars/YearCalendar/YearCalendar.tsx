import {FC, useMemo} from 'react'
import {YearCalendarProps} from '../types'
import {SmallMonthCalendar} from '../DatePicker/SmallMonthCalendar'
import styled, {css} from 'styled-components'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {SmallCalendarMonthTitle} from '../DatePicker/SmallCalendarMonthTitle'
import {useGetTaskSchemeQuery} from "../../../store/api/taskApi";
import {getTaskSchemeScope} from "../../../common/calendarSupport/scopes";
import dayjs from 'dayjs'
import {Loader} from "../../Loaders/Loader";

const YearGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, minmax(20px, 1fr));
  grid-gap: 20px;
  grid-template-rows: 230px 230px 230px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  position: relative;
`

export const YearCalendar: FC<YearCalendarProps> = ({
																											yearItem,
																											taskStorage,
																											onChangeCurrent,
																										}) => {
	const dateForScheme: Date = useMemo(() => {
		return dayjs().set('year', yearItem.year).startOf('year').toDate()
	}, [yearItem.year])
	
	const {data: taskScheme, isFetching} = useGetTaskSchemeQuery(getTaskSchemeScope(dateForScheme, 'year', true))
	
	
	return (
		<FlexBlock mt={32} mb={32} width={'100%'}>
			<Loader title={'Загрузка схемы событий...'} isActive={isFetching}>
				<YearGrid>
					{yearItem.months.map((monthItem) => {
						return (
							<FlexBlock
								key={`monthItem_year_${monthItem.year}_month_${monthItem.monthOfYear}`}
							>
								<SmallMonthCalendar
									includesTasks={taskScheme}
									taskStorage={taskStorage}
									title={(
										<FlexBlock
											width={'100%'}
											position={'sticky'}
											bgColor={'#fff'}
											additionalCss={css`
                        z-index: 1;
                        top: 0;
                        left: 0;
											`}
										>
											<SmallCalendarMonthTitle
												monthItem={monthItem}
												onClick={(data) => onChangeCurrent && onChangeCurrent(new Date(data.year, data.monthOfYear, 1), 'month')}
											/>
										</FlexBlock>
									)}
									onSelectDate={(data) => onChangeCurrent && onChangeCurrent(data.value, 'day')}
									onSelectWeek={(current) => onChangeCurrent && onChangeCurrent(current.aroundDate, 'week')}
									monthItem={monthItem}
									current={{
										layout: 'month',
										month: monthItem.monthOfYear,
										year: monthItem.year
									}}
								/>
							</FlexBlock>
						)
					})}
				</YearGrid>
			</Loader>
		</FlexBlock>
	)
}
