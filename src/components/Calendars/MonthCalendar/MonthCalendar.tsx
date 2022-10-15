import React, {FC, useMemo} from 'react'
import {MonthCalendarProps} from '../types'
import {CalendarDateListContainer, CalendarDesktopContainer} from '../Calendar.styled'
import {WeeKCalendar} from '../WeekCalendar/WeekCalendar'
import {useGetTaskCountOfStatusQuery, useGetTasksAtScopeQuery} from "../../../store/api/taskApi/taskApi";
import {getTaskSchemeScope} from "../../../common/calendarSupport/scopes";
import {initialFiltersValues, useEventFilters} from "../../../hooks/useEventFilters";
import dayjs from "dayjs";
import {EventFilter} from "../DayCalendar/EventFilter";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {WeekDays} from "../WeekDays/WeekDays";
import {WeekDaysList} from "../../../common/constants";
import {useAppSelector} from "../../../store/hooks/hooks";

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
	
	const {statuses} = useAppSelector(state => state.calendar)
	
	const {filters, setFiltersState, debounceValue, handlers} = useEventFilters({
		initialValues: {
			title: null,
			priority: null,
			start: dayjs(scope.fromDate).toDate(),
			end: dayjs(scope.toDate).toDate(),
			taskStatus: statuses
		},
		layout: current.layout
	})
	
	const queryArgs = useMemo(() => {
		return {
			title: debounceValue.title,
			fromDate: debounceValue.start.toString(),
			toDate: debounceValue.end.toString(),
			priority: debounceValue.priority,
		}
	}, [debounceValue])
	
	const {data} = useGetTasksAtScopeQuery({
		...queryArgs,
		taskStatus: debounceValue.taskStatus
	})
	
	const {data: SwitcherBadges} = useGetTaskCountOfStatusQuery(queryArgs)
	
	//TODO написать функционал и запрос на бэке для подсчета количества задач по статусам событий
	
	
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
								taskStorage={data || {}}
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
