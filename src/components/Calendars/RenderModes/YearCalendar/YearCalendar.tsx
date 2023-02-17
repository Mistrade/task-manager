import {FC, useMemo} from 'react'
import {YearCalendarProps} from '../../types'
import {css} from 'styled-components'
import {FlexBlock} from '../../../LayoutComponents/FlexBlock'
import {SmallCalendarMonthTitle} from '../../SmallMotnCalendar/SmallCalendarMonthTitle'
import {useGetTaskSchemeQuery} from "../../../../store/api/taskApi/taskApi";
import {DateScopeHelper, TaskSchemeDateScopeInterface} from "../../../../common/calendarSupport/scopes";
import {Loader} from "../../../Loaders/Loader";
import {borderRadiusSize, pageHeaderColor} from '../../../../common/constants'
import {SmallMonth} from "../../SmallMotnCalendar/SmallMonth";

export const YearCalendar: FC<YearCalendarProps> = ({
																											yearItem,
																											onChangeCurrent,
																										}) => {
	const schemeScope: TaskSchemeDateScopeInterface = useMemo(() => {
		return new DateScopeHelper({useOtherDays: false})
			.getDateScopeForTaskScheme(new Date(yearItem.year), 'year')
	}, [yearItem.year])
	
	
	const {data: taskScheme, isFetching} = useGetTaskSchemeQuery(schemeScope)
	
	
	return (
		<FlexBlock mt={4} mb={4} width={'100%'} overflowY={'auto'} overflowX={'hidden'}>
			<Loader title={'Загрузка схемы...'} isActive={isFetching}>
				<FlexBlock gap={8} wrap={'wrap'} justify={'flex-start'} align={'flex-start'}>
					{yearItem.months.map((monthItem) => {
						return (
							<FlexBlock
								key={`monthItem_year_${monthItem.year}_month_${monthItem.monthOfYear}`}
								p={4}
								borderRadius={borderRadiusSize.xs}
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
