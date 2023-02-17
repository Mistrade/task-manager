import React, {FC, useCallback, useEffect, useMemo} from 'react'
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
import {initialFiltersValues, useEventFilters} from "../../../../../hooks/useEventFilters";
import {useAppSelector} from "../../../../../store/hooks/hooks";
import {currentColor, defaultColor} from "../../../../../common/constants";
import {Accordion} from "../../../../Accordion/Accordion";
import {Badge} from "../../../../Badge/Badge";

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
			utcOffset: dayjs().utcOffset()
		}
	}, [debounceValue])
	
	const {
		data,
		isLoading,
		isError,
		error,
		isSuccess,
		isFetching: isFetchingTasks,
		refetch: refetchTaskList
	} = useGetTasksAtDayQuery({
		...queryArgs,
		taskStatus: debounceValue.taskStatus
	}, {refetchOnMountOrArgChange: true})
	
	const {
		data: SwitcherBadges,
		refetch: refetchTaskCount,
		isFetching: isFetchingStatuses
	} = useGetTaskCountOfStatusQuery(queryArgs)
	
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
	
	return (
		<TaskListMainContainer>
			<EventFilter
				statusBadges={SwitcherBadges}
				values={filters}
				isLoading={isFetchingTasks || isFetchingStatuses}
				onChangeHandlers={handlers}
			/>
			<FlexBlock
				direction={'column'}
				overflowY={'auto'}
				overflowX={'hidden'}
				height={'100vh'}
				wrap={'nowrap'}
				ml={-8}
				pl={8}
				mr={-8}
				pr={8}
			>
				{(data?.throughEvents?.length === 0 && data?.baseEvents?.length === 0) || !data || error ? (
					<FlexBlock width={'100%'} height={'100%'} justify={'center'} align={'center'}>
						<NotFoundTask
							onAddTask={onAddTask}
							day={day}
							text={<>По указанным фильтрам <br/>ничего не найдено!</>}
							actions={<Button onClick={clearFiltersHandle}>Очистить фильтры</Button>}
						/>
					</FlexBlock>
				) : (
					<FlexBlock direction={'column'} width={'100%'} height={'max-content'} gap={12}>
						{data?.throughEvents?.length ? (
							<Accordion
								zIndex={2}
								initialState={false}
								title={
									<FlexBlock
										width={'100%'}
										p={'4px 6px'}
										align={'center'}
										justify={'flex-start'}
										fSize={22}
										style={{color: currentColor}}
										fWeight={'bold'}
									>
										<span>
										Сквозные события <Badge
											style={{fontSize: 18, color: defaultColor}}
										>
											{data.throughEvents.length}
										</Badge>
										</span>
									</FlexBlock>
								}
							>
								{data.throughEvents.map((task, index) => (
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
							</Accordion>
						) : <></>}
						{data?.baseEvents?.length ? (
							<Accordion
								zIndex={1}
								title={
									<FlexBlock
										width={'100%'}
										p={'4px 6px'}
										align={'center'}
										justify={'flex-start'}
										fSize={22}
										style={{color: currentColor}}
										fWeight={'bold'}
									>
										<span>
										Список событий <Badge
											style={{fontSize: 18, color: defaultColor}}
										>
											{data.baseEvents.length}
										</Badge>
										</span>
									</FlexBlock>
								}
							>
								{data.baseEvents.map((task, index) => (
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
							</Accordion>
						) : <></>}
					</FlexBlock>
				)}
			</FlexBlock>
		</TaskListMainContainer>
	)
}

