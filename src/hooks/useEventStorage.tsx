import {PlannerMode, EventsStorage} from "../pages/Planner/planner.types";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks/hooks";
import {EventFiltersProps, useEventFilters, UseEventFiltersReturned} from "./useEventFilters";
import {useGetEventsCountOfStatusQuery, useGetEventsStorageQuery} from "../store/api/planning-api";
import {SwitcherBadges} from "../components/Switcher/Switcher";
import dayjs from "dayjs";
import {GetEventsFiltersRequestProps, ShortEventInfoModel} from "../store/api/planning-api/types/event-info.types";
import {EventFilterTaskStatuses} from "../pages/Planner/RenderModes/FindEventFilter/find-event-filters.types";

interface Scope {
	start: Date,
	end: Date
}

interface UseTaskStorageProps {
	scope: Scope,
	layout: PlannerMode['layout'],
	onlyFavorites?: boolean
}

interface UseTaskStorageQueryArgsReturned extends UseEventFiltersReturned {
	queryArgs: GetEventsFiltersRequestProps,
	taskStatus: EventFiltersProps['taskStatus'],
	TaskStorage?: EventsStorage,
	SwitcherBadges?: SwitcherBadges<EventFilterTaskStatuses> | null,
	isFetching: boolean
}

type UseTaskStorageQueryArgsHookType = (props: UseTaskStorageProps) => UseTaskStorageQueryArgsReturned

const getQueryArgs = (values: EventFiltersProps): GetEventsFiltersRequestProps => {
	return {
		title: values.title,
		fromDate: values.start?.toString() || "",
		toDate: values.end?.toString() || "",
		priority: values.priority,
		taskStatus: values.taskStatus,
		onlyFavorites: !!values.onlyFavorites,
		utcOffset: dayjs().utcOffset()
	}
}

export const useEventStorage: UseTaskStorageQueryArgsHookType = (props) => {
	const dispatch = useAppDispatch()
	const {statuses: taskStatus} = useAppSelector(state => state.planner)
	
	const filtersReturned = useEventFilters({
		initialValues: {
			title: null,
			taskStatus,
			start: props.scope.start,
			end: props.scope.end,
			priority: null,
			onlyFavorites: !!props.onlyFavorites,
			utcOffset: dayjs().utcOffset()
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
	
	const {data: TaskStorage, refetch, isFetching: isFetchingStorage} = useGetEventsStorageQuery({
		...queryArgs,
		findOnlyInSelectedGroups: true
	}, {refetchOnMountOrArgChange: true})
	
	const {data: SwitcherBadges, refetch: refetchBadges, isFetching: isFetchingBadges} = useGetEventsCountOfStatusQuery({
		title: queryArgs.title,
		fromDate: queryArgs.fromDate,
		toDate: queryArgs.toDate,
		priority: queryArgs.priority,
		onlyFavorites: queryArgs.onlyFavorites,
		utcOffset: queryArgs.utcOffset,
		findOnlyInSelectedGroups: true,
	})
	
	return {
		queryArgs,
		taskStatus: filtersReturned.debounceValue.taskStatus,
		TaskStorage: TaskStorage?.data || {},
		SwitcherBadges: SwitcherBadges?.data,
		...filtersReturned,
		isFetching: isFetchingBadges || isFetchingStorage
	}
}