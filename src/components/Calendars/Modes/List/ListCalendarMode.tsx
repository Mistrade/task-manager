import React, {FC, useCallback} from "react";
import {ListCalendarModeProps, TaskStorageType} from "../../types";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {EventFilter} from "../DayCalendar/EventFilter";
import {useAppDispatch} from "../../../../store/hooks/hooks";
import {changeCalendarCurrent} from "../../../../store/reducers/calendar";
import {ShortEventItem} from "../../../../store/api/taskApi/types";
import {ListModeTaskController} from "./ListModeTaskController";
import {useTaskStorageQueryArgs} from "../../../../hooks/useTaskStorageScope";


export const ListCalendarMode: FC<ListCalendarModeProps> = ({current, onSelectTask}) => {
	
	
	const dispatch = useAppDispatch()
	const {TaskStorage, SwitcherBadges, handlers, filters, debounceValue, isFetching} = useTaskStorageQueryArgs({
		layout: 'list',
		scope: {
			start: current.fromDate,
			end: current.toDate
		}
	})
	
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
			mt={4}
			mb={4}
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
					isLoading={isFetching}
				/>
			</FlexBlock>
			<FlexBlock
				overflowY={'auto'}
				overflowX={'hidden'}
				position={'relative'}
				direction={'column'}
				height={'100vh'}
				width={'100%'}
				ml={-8}
				mr={-8}
				pl={8}
				pr={8}
			>
				<ListModeTaskController
					eventStorage={TaskStorage as TaskStorageType<ShortEventItem>}
					fromDate={debounceValue.start}
					toDate={debounceValue.end}
					onSelectTask={onSelectTask}
				/>
			</FlexBlock>
		</FlexBlock>
	)
}