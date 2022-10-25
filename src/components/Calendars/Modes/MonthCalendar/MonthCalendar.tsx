import React, {FC, useMemo} from 'react'
import {MonthCalendarProps} from '../../types'
import {CalendarDateListContainer, CalendarDesktopContainer} from '../../Calendar.styled'
import {WeeKCalendar} from '../WeekCalendar/WeekCalendar'
import {getTaskSchemeScope} from "../../../../common/calendarSupport/scopes";
import dayjs from "dayjs";
import {EventFilter} from "../DayCalendar/EventFilter";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {WeekDays} from "../WeekCalendar/WeekDays/WeekDays";
import {WeekDaysList} from "../../../../common/constants";
import {useTaskStorageQueryArgs} from "../../../../hooks/useTaskStorageScope";

export const MonthCalendar: FC<MonthCalendarProps> = ({
																												monthItem,
																												current,
																												onAddTask,
																												onSelectTask,
																												onChangeCurrent,
																												renderTaskCount,
																											}) => {
	const scope = useMemo(() => {
		return getTaskSchemeScope(new Date(monthItem.year, monthItem.monthOfYear, 1), 'month', false)
	}, [monthItem.monthOfYear])
	
	const {filters, SwitcherBadges, TaskStorage, handlers} = useTaskStorageQueryArgs({
		layout: current.layout,
		scope: {
			start: dayjs(scope.fromDate).toDate(),
			end: dayjs(scope.toDate).toDate()
		},
	})
	
	return (
		<FlexBlock
			width={'100%'}
			direction={'column'}
			mt={16}
			mb={16}
		>
			<FlexBlock width={'100%'} mb={8}>
				<EventFilter
					values={filters}
					onChangeHandlers={handlers}
					statusBadges={SwitcherBadges}
				/>
			</FlexBlock>
			<FlexBlock width={'100%'} mb={6} pt={6}>
				<WeekDays list={WeekDaysList} gap={4}/>
			</FlexBlock>
			<FlexBlock
				overflow={'scroll'}
			>
				<CalendarDesktopContainer>
					<CalendarDateListContainer rowsCount={6}>
						{monthItem.weeks.map((week) => (
							<WeeKCalendar
								taskStorage={TaskStorage || {}}
								key={`monthCalendarWeek_year_${monthItem.year}_month_${monthItem.monthOfYear}_week_${week.weekOfYear}`}
								weekItem={week}
								current={current}
								onChangeCurrent={onChangeCurrent}
								onSelectTask={onSelectTask}
								renderTaskCount={renderTaskCount}
								onAddTask={onAddTask}
							/>
						))}
					</CalendarDateListContainer>
				</CalendarDesktopContainer>
			</FlexBlock>
		</FlexBlock>
	)
}
