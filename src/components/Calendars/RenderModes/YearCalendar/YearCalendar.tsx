import {FC, useMemo} from 'react'
import {YearCalendarProps} from '../../types'
import styled, {css} from 'styled-components'
import {FlexBlock} from '../../../LayoutComponents/FlexBlock'
import {SmallCalendarMonthTitle} from '../../SmallMotnCalendar/SmallCalendarMonthTitle'
import {useGetTaskSchemeQuery} from "../../../../store/api/taskApi/taskApi";
import {DateScopeHelper, TaskSchemeDateScopeInterface} from "../../../../common/calendarSupport/scopes";
import {Loader} from "../../../Loaders/Loader";
import {borderRadiusSize, pageHeaderColor} from '../../../../common/constants'
import {SmallMonth} from "../../SmallMotnCalendar/SmallMonth";
import {DayEventItemBoxShadowMixin} from "../DayCalendar/TaskList/DayTaskItem";

const MonthItemContainer = styled('div')`
  padding: 4px;
  border-radius: ${borderRadiusSize.md};
  justify-content: center;
  align-items: center;
  width: calc(25% - 8px);
  background-color: transparent;
  ${DayEventItemBoxShadowMixin};

  &:hover {
    background-color: ${pageHeaderColor};
  }

  transition: background-color .3s ease-in-out, box-shadow .3s ease-in-out;
`

const MonthTitleWrapper = styled('div')`
  width: 100%;
  position: sticky;
  background-color: transparent;
  z-index: 1;
  left: 0;
  top: 0;
`

export const YearCalendar: FC<YearCalendarProps> = ({
																											yearItem,
																											onChangeCurrent,
																										}) => {
	const schemeScope: TaskSchemeDateScopeInterface = useMemo(() => {
		return new DateScopeHelper({useOtherDays: false})
			.getDateScopeForTaskScheme(new Date(yearItem.year, 0, 1), 'year')
	}, [yearItem.year])
	
	const {data: taskScheme, isFetching} = useGetTaskSchemeQuery(schemeScope)
	
	
	return (
		<FlexBlock
			mt={4}
			mb={4}
			width={'100%'}
			overflowY={'auto'}
			overflowX={'hidden'}
			p={8}
		>
			<Loader title={'Загрузка схемы...'} isActive={isFetching}>
				<FlexBlock
					wrap={'wrap'}
					direction={'row'}
					justify={'flex-start'}
					align={'flex-start'}
					gap={4}
				>
					{yearItem.months.map((monthItem) => {
						return (
							<MonthItemContainer
								key={`monthItem_year_${monthItem.year}_month_${monthItem.monthOfYear}`}
							>
								<SmallMonth
									current={{
										layout: "month",
										month: monthItem.monthOfYear,
										year: monthItem.year
									}}
									includesTasks={taskScheme}
									title={(
										<MonthTitleWrapper>
											<SmallCalendarMonthTitle
												monthItem={monthItem}
												onClick={(data) => onChangeCurrent && onChangeCurrent(new Date(data.year, data.monthOfYear, 1), 'month')}
											/>
										</MonthTitleWrapper>
									)}
									onSelectDate={(data) => onChangeCurrent && onChangeCurrent(data.value, 'day')}
									onSelectWeek={(current) => onChangeCurrent && onChangeCurrent(current.aroundDate, 'week')}
									monthItem={monthItem}
								/>
							</MonthItemContainer>
						)
					})}
				</FlexBlock>
			</Loader>
		</FlexBlock>
	)
}
