import {FC, useMemo} from 'react'
import {YearCalendarProps} from '../../types'
import {css} from 'styled-components'
import {FlexBlock} from '../../../LayoutComponents/FlexBlock'
import {SmallCalendarMonthTitle} from '../../SmallMotnCalendar/SmallCalendarMonthTitle'
import {useGetTaskSchemeQuery} from "../../../../store/api/taskApi/taskApi";
import {getTaskSchemeScope} from "../../../../common/calendarSupport/scopes";
import dayjs from 'dayjs'
import {Loader} from "../../../Loaders/Loader";
import {pageHeaderColor} from '../../../../common/constants'
import {SmallMonth} from "../../SmallMotnCalendar/SmallMonth";

export const YearCalendar: FC<YearCalendarProps> = ({
																											yearItem,
																											onChangeCurrent,
																										}) => {
	const dateForScheme: Date = useMemo(() => {
		return dayjs().set('year', yearItem.year).startOf('year').toDate()
	}, [yearItem.year])
	
	const {data: taskScheme, isFetching} = useGetTaskSchemeQuery(getTaskSchemeScope(dateForScheme, 'year', true))
	
	
	return (
		<FlexBlock mt={16} mb={16} width={'100%'} overflow={'scroll'}>
			<Loader title={'Загрузка схемы событий...'} isActive={isFetching}>
				<FlexBlock gap={8} wrap={'wrap'} justify={'flex-start'} align={'flex-start'}>
					{yearItem.months.map((monthItem) => {
						return (
							<FlexBlock
								key={`monthItem_year_${monthItem.year}_month_${monthItem.monthOfYear}`}
								p={4}
								borderRadius={4}
								justify={'center'}
								align={'center'}
								width={'calc(25% - 8px)'}
								additionalCss={css`&:hover {
                  background-color: ${pageHeaderColor}
                }`}
							>
								<SmallMonth
									current={{
										layout: "month",
										month: monthItem.monthOfYear,
										year: monthItem.year
									}}
									includesTasks={taskScheme}
									title={(
										<FlexBlock
											width={'100%'}
											position={'sticky'}
											bgColor={'transparent'}
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
								/>
							</FlexBlock>
						)
					})}
				</FlexBlock>
			</Loader>
		</FlexBlock>
	)
}