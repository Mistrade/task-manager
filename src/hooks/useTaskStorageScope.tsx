import {CalendarMode, TaskStorage, WeekItem} from "../components/Calendars/types";
import {ShortEventItem} from "../store/api/taskApi/types";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useAppSelector} from "../store/hooks/hooks";
import dayjs from "dayjs";
import {EventFilters, useEventFilters, UseEventFiltersReturned} from "./useEventFilters";
import {EventFilterOnChangeHandle, FilterTaskStatuses} from "../components/Calendars/Modes/DayCalendar/EventFilter";
import {useGetTaskCountOfStatusQuery, useGetTasksAtScopeQuery} from "../store/api/taskApi/taskApi";
import {SwitcherBadges} from "../components/Switcher/Switcher";

interface Scope {
	start: Date,
	end: Date
}

interface UseTaskStorageProps {
	scope: Scope,
	layout: CalendarMode['layout']
}

interface UseTaskStorageQueryArgsReturned extends UseEventFiltersReturned {
	queryArgs: GetTaskStorageQueryArgs,
	taskStatus: EventFilters['taskStatus'],
	TaskStorage?: TaskStorage<ShortEventItem>,
	SwitcherBadges?: SwitcherBadges<FilterTaskStatuses>
}

type UseTaskStorageQueryArgsHookType = (props: UseTaskStorageProps) => UseTaskStorageQueryArgsReturned

interface GetTaskStorageQueryArgs {
	title: EventFilters['title'],
	fromDate: string,
	toDate: string,
	priority: EventFilters['priority'],
	taskStatus: EventFilters['taskStatus']
}

const getQueryArgs = (values: EventFilters): GetTaskStorageQueryArgs => {
	return {
		title: values.title,
		fromDate: values.start.toString(),
		toDate: values.end.toString(),
		priority: values.priority,
		taskStatus: values.taskStatus,
	}
}

export const useTaskStorageQueryArgs: UseTaskStorageQueryArgsHookType = (props) => {
	const {statuses: taskStatus} = useAppSelector(state => state.calendar)
	
	const filtersReturned = useEventFilters({
		initialValues: {
			title: null,
			taskStatus,
			start: props.scope.start,
			end: props.scope.end,
			priority: null,
		},
		layout: props.layout
	})
	
	useEffect(() => {
		filtersReturned.handlers.start(props.scope.start)
	}, [props.scope.start])
	
	useEffect(() => {
		filtersReturned.handlers.end(props.scope.end)
	}, [props.scope.end])
	
	useEffect(() => {
		setQueryArgs(getQueryArgs(filtersReturned.debounceValue))
	}, [filtersReturned.debounceValue])
	
	const [queryArgs, setQueryArgs] = useState(getQueryArgs(filtersReturned.filters))
	
	const {data: TaskStorage} = useGetTasksAtScopeQuery(queryArgs)
	
	const {data: SwitcherBadges} = useGetTaskCountOfStatusQuery({
		title: queryArgs.title,
		fromDate: queryArgs.fromDate,
		toDate: queryArgs.toDate,
		priority: queryArgs.priority,
	})
	
	
	return {
		queryArgs,
		taskStatus: filtersReturned.debounceValue.taskStatus,
		TaskStorage,
		SwitcherBadges,
		...filtersReturned
	}
}