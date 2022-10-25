import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {FlexBlock} from '../../../../LayoutComponents/FlexBlock'
import {CalendarCurrentDay, CalendarPriorityKeys, GlobalTaskListProps, OnSelectTaskFnType} from '../../../types'
import dayjs from 'dayjs'
import {Button} from '../../../../Buttons/Buttons.styled'
import {EventFilter, FilterTaskStatuses} from '../EventFilter'
import {
	useGetTaskCountOfStatusQuery,
	useGetTasksAtDayQuery,
	useRemoveTaskMutation
} from "../../../../../store/api/taskApi/taskApi";
import {DayTaskItem} from "./DayTaskItem";
import {NotFoundTask} from "./NotFoundTasks";
import {TaskListMainContainer} from "./TaskList.styled";
import {css} from "styled-components";
import {initialFiltersValues, useEventFilters} from "../../../../../hooks/useEventFilters";
import {useAppSelector} from "../../../../../store/hooks/hooks";
import {Delay} from "../../../../../common/functions";
import {Loader} from "../../../../Loaders/Loader";

interface DayTaskListProps extends GlobalTaskListProps {
	day: Date
	current: CalendarCurrentDay,
	onSelectTask?: OnSelectTaskFnType,
}

export interface EventFilters {
	title: string | null,
	priority: null | CalendarPriorityKeys,
	start: null | Date,
	end: null | Date,
	taskStatus: FilterTaskStatuses
}

export const DayTaskList: FC<DayTaskListProps> = ({
																										current,
																										onSelectTask,
																										day,
																										onAddTask
																									}) => {
	const statuses = useAppSelector(state => state.calendar.statuses)
	
	const {
		filters,
		debounceValue,
		setFiltersState,
		handlers
	} = useEventFilters({initialValues: initialFiltersValues(day, statuses), layout: current.layout})
	
	const queryArgs = useMemo(() => {
		return {
			fromDate:
				debounceValue.start
					? dayjs(debounceValue.start).utc().toString()
					: dayjs(day).utc().toString(),
			toDate:
				debounceValue.end
					? dayjs(debounceValue.end).utc().toString()
					: dayjs(day).add(23, 'hour').add(59, 'minute').utc().toString(),
			title: debounceValue.title,
			priority: debounceValue.priority === 'not_selected' ? null : debounceValue.priority,
		}
	}, [debounceValue])
	
	const {data, isLoading, isError, isSuccess, isFetching, refetch: refetchTaskList} = useGetTasksAtDayQuery({
		...queryArgs,
		taskStatus: debounceValue.taskStatus
	}, {refetchOnMountOrArgChange: true})
	
	const {data: SwitcherBadges, refetch: refetchTaskCount} = useGetTaskCountOfStatusQuery(queryArgs)
	
	const [removeTask, {isSuccess: isRemoveSuccess, isError: isRemoveError}] = useRemoveTaskMutation()
	
	useEffect(() => {
		clearFiltersHandle()
	}, [current.date])
	
	const clearFiltersHandle = useCallback(() => {
		setFiltersState(initialFiltersValues(current.date, filters.taskStatus))
	}, [current.date, filters.taskStatus])
	
	const memoRefetchTaskCount = useCallback(async () => {
		await refetchTaskCount()
	}, [])
	
	const [fetching, setFetching] = useState(false)
	
	// useEffect(() => {
	// 	if (isFetching) {
	// 		setFetching(true)
	// 	} else {
	// 		Delay(250).then(() => setFetching(false))
	// 	}
	// }, [isFetching])
	
	return (
		<TaskListMainContainer>
			<EventFilter
				statusBadges={SwitcherBadges}
				values={filters}
				onChangeHandlers={handlers}
			/>
			<FlexBlock
				direction={'column'}
				overflow={'scroll'}
				height={'100vh'}
				wrap={'nowrap'}
				additionalCss={css`
          scroll-snap-type: y proximity;
				`}
				ml={-8}
				pl={8}
				mr={-8}
				pr={8}
			>
				<Loader
					title={'Обновляем список событий'}
					isActive={fetching}
				>
					{!!data?.length ? (
						<FlexBlock direction={'column'} width={'100%'} height={'max-content'} pt={4}>
							{data.map((task, index) => (
								<DayTaskItem
									key={task.time.toString() + index}
									taskInfo={task}
									day={day}
									tabIndex={index + 1}
									onSelectTask={onSelectTask}
									onDelete={async (id) => await removeTask({id}).unwrap()}
									refetchTaskList={memoRefetchTaskCount}
								/>
							))}
						</FlexBlock>
					) : (
						<NotFoundTask
							onAddTask={onAddTask}
							day={day}
							text={<>Событий по указанным фильтрам<br/>не найдено!</>}
							actions={<Button onClick={clearFiltersHandle}>Очистить фильтры</Button>}
						/>
					)}
				</Loader>
			</FlexBlock>
		</TaskListMainContainer>
	)
}

