import {CalendarMode, TaskStorageType} from "../components/Calendars/types";
import {ShortEventItem} from "../store/api/taskApi/types";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks/hooks";
import {EventFilters, useEventFilters, UseEventFiltersReturned} from "./useEventFilters";
import {FilterTaskStatuses} from "../components/Calendars/Modes/DayCalendar/EventFilter";
import {useGetTaskCountOfStatusQuery, useGetTasksAtScopeQuery} from "../store/api/taskApi/taskApi";
import {SwitcherBadges} from "../components/Switcher/Switcher";
import dayjs from "dayjs";

interface Scope {
	start: Date,
	end: Date
}

interface UseTaskStorageProps {
	scope: Scope,
	layout: CalendarMode['layout'],
	onlyFavorites?: boolean
}

interface UseTaskStorageQueryArgsReturned extends UseEventFiltersReturned {
	queryArgs: GetTaskStorageQueryArgs,
	taskStatus: EventFilters['taskStatus'],
	TaskStorage?: TaskStorageType<ShortEventItem>,
	SwitcherBadges?: SwitcherBadges<FilterTaskStatuses>,
	isFetching: boolean
}

type UseTaskStorageQueryArgsHookType = (props: UseTaskStorageProps) => UseTaskStorageQueryArgsReturned

interface GetTaskStorageQueryArgs {
	title: EventFilters['title'],
	fromDate: string,
	toDate: string,
	priority: EventFilters['priority'],
	taskStatus: EventFilters['taskStatus'],
	onlyFavorites?: boolean,
	utcOffset: number
}

const getQueryArgs = (values: EventFilters): GetTaskStorageQueryArgs => {
	return {
		title: values.title,
		fromDate: values.start.toString(),
		toDate: values.end.toString(),
		priority: values.priority,
		taskStatus: values.taskStatus,
		onlyFavorites: !!values.onlyFavorites,
		utcOffset: dayjs().utcOffset()
	}
}

export const useTaskStorageQueryArgs: UseTaskStorageQueryArgsHookType = (props) => {
	const dispatch = useAppDispatch()
	const {statuses: taskStatus} = useAppSelector(state => state.calendar)
	
	const filtersReturned = useEventFilters({
		initialValues: {
			title: null,
			taskStatus,
			start: props.scope.start,
			end: props.scope.end,
			priority: null,
			onlyFavorites: !!props.onlyFavorites
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
	
	const {data: TaskStorage, refetch, isFetching: isFetchingStorage} = useGetTasksAtScopeQuery({
		...queryArgs,
		layout: props.layout
	}, {refetchOnMountOrArgChange: true})
	
	const {data: SwitcherBadges, refetch: refetchBadges, isFetching: isFetchingBadges} = useGetTaskCountOfStatusQuery({
		title: queryArgs.title,
		fromDate: queryArgs.fromDate,
		toDate: queryArgs.toDate,
		priority: queryArgs.priority,
		onlyFavorites: queryArgs.onlyFavorites,
		utcOffset: queryArgs.utcOffset
	})
	
	return {
		queryArgs,
		taskStatus: filtersReturned.debounceValue.taskStatus,
		TaskStorage,
		SwitcherBadges,
		...filtersReturned,
		isFetching: isFetchingBadges || isFetchingStorage
	}
}