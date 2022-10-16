import React, {FC, useCallback, useMemo} from "react";
import {ListCalendarModeProps} from "../../types";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {EventFilter} from "../DayCalendar/EventFilter";
import {useGetTaskCountOfStatusQuery, useGetTasksAtScopeQuery} from "../../../../store/api/taskApi/taskApi";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks/hooks";
import {useEventFilters} from "../../../../hooks/useEventFilters";
import {changeCalendarCurrent} from "../../../../store/reducers/calendar";


export const ListCalendarMode: FC<ListCalendarModeProps> = ({current, onSelectTask}) => {
	
	
	const {statuses} = useAppSelector(state => state.calendar)
	const dispatch = useAppDispatch()
	const {filters, setFiltersState, debounceValue, handlers} = useEventFilters({
		initialValues: {
			title: null,
			priority: null,
			start: current.fromDate,
			end: current.toDate,
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
	
	const onChangeDate = useCallback((date: Date, type: 'start' | 'end') => {
		if (type === 'start') {
			handlers.start(date)
			return dispatch(changeCalendarCurrent({
				layout: 'list', date: {
					layout: 'list',
					fromDate: date.toString(),
					toDate: current.toDate.toString()
				}
			}))
		}
		
		if (type === 'end') {
			handlers.end(date)
			return dispatch(changeCalendarCurrent({
				layout: 'list', date: {
					layout: 'list',
					fromDate: current.fromDate.toString(),
					toDate: date.toString()
				}
			}))
		}
	}, [current])
	
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
					onChangeHandlers={{
						...handlers,
						start: (date) => onChangeDate(date, 'start'),
						end: (date) => onChangeDate(date, 'end'),
					}}
					statusBadges={SwitcherBadges}
				/>
			</FlexBlock>
			<FlexBlock
				overflow={'scroll'}
			>
				Тут будут события
			</FlexBlock>
		</FlexBlock>
	)
}