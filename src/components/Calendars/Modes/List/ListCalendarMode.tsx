import React, {FC, useCallback, useMemo} from "react";
import {ListCalendarModeProps, TaskStorage} from "../../types";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {EventFilter} from "../DayCalendar/EventFilter";
import {useGetTaskCountOfStatusQuery, useGetTasksAtScopeQuery} from "../../../../store/api/taskApi/taskApi";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks/hooks";
import {useEventFilters} from "../../../../hooks/useEventFilters";
import {changeCalendarCurrent} from "../../../../store/reducers/calendar";
import {ShortEventItem} from "../../../../store/api/taskApi/types";
import {ListModeTaskController} from "./ListModeTaskController";


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
						//TODO Добавить обработку на изменение диапазона (например не более 90 дней или 30 дней должна быть разница между start и end)
						start: (date) => onChangeDate(date, 'start'),
						end: (date) => onChangeDate(date, 'end'),
					}}
					statusBadges={SwitcherBadges}
				/>
			</FlexBlock>
			<FlexBlock
				overflow={'scroll'}
				position={'relative'}
				direction={'column'}
				width={'100%'}
				m={-8}
				p={8}
			>
				<ListModeTaskController
					eventStorage={data as TaskStorage<ShortEventItem>}
					fromDate={debounceValue.start}
					toDate={debounceValue.end}
					onSelectTask={onSelectTask}
				/>
			</FlexBlock>
		</FlexBlock>
	)
}