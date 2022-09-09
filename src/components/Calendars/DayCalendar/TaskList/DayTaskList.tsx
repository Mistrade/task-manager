import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {FlexBlock} from '../../../LayoutComponents/FlexBlock'
import {CalendarCurrentDay, CalendarPriorityKeys, GlobalTaskListProps, OnSelectTaskFnType} from '../../types'
import dayjs from 'dayjs'
import {Button} from '../../../Buttons/Buttons.styled'
import {EventFilter, EventFilterOnChangeHandle, FilterTaskStatuses} from '../EventFilter'
import {useGetTasksAtDayQuery, useRemoveTaskMutation} from "../../../../store/api/taskApi/taskApi";
import {useDebounce} from "../../../../hooks/useDebounce";
import {Loader} from "../../../Loaders/Loader";
import {DayTaskItem} from "./DayTaskItem";
import {NotFoundTask} from "./NotFoundTasks";
import {TaskListEventFiltersContainer, TaskListMainContainer} from "./TaskList.styled";

interface DayTaskListProps extends GlobalTaskListProps {
	day: Date
	current: CalendarCurrentDay,
	onSelectTask?: OnSelectTaskFnType,
}

export interface DayTaskListFilters {
	title: string | null,
	priority: null | CalendarPriorityKeys,
	start: null | Date,
	end: null | Date,
	taskStatus: FilterTaskStatuses
}

const initialFiltersValues: (day: Date) => DayTaskListFilters = (day) => ({
	title: null,
	priority: null,
	start: dayjs(day).startOf('day').toDate(),
	end: dayjs(day).endOf('day').toDate(),
	taskStatus: 'in_work'
})

export const DayTaskList: FC<DayTaskListProps> = ({
																										current,
																										onSelectTask,
																										day,
																										onAddTask
																									}) => {
	const [filters, setFilters] = useState<DayTaskListFilters>(initialFiltersValues(day))
	
	const debounceValue = useDebounce(filters, 300)
	
	const changeFiltersStateHandler = <T extends keyof DayTaskListFilters>(fieldName: T, value: DayTaskListFilters[T]) => {
		setFilters((prev) => {
			return {
				...prev,
				[fieldName]: value
			}
		})
	}
	
	const eventFiltersHandlers: EventFilterOnChangeHandle = useMemo(() => ({
		start: (date) => changeFiltersStateHandler('start', date),
		end: (date) => changeFiltersStateHandler('end', date),
		title: (value) => changeFiltersStateHandler('title', value),
		priority: (key) => changeFiltersStateHandler('priority', key === 'not_selected' ? null : key),
		taskStatus: (value) => changeFiltersStateHandler('taskStatus', value)
	}), [])
	
	const {data, isLoading, isError, isSuccess, isFetching} = useGetTasksAtDayQuery({
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
		taskStatus: debounceValue.taskStatus
	}, {refetchOnMountOrArgChange: true})
	
	const [removeTask, {isSuccess: isRemoveSuccess, isError: isRemoveError}] = useRemoveTaskMutation()
	
	useEffect(() => {
		clearFiltersHandle()
	}, [day])
	
	const clearFiltersHandle = useCallback(() => {
		setFilters(initialFiltersValues(day))
	}, [day])
	
	
	return (
		<TaskListMainContainer>
			<TaskListEventFiltersContainer>
				<EventFilter
					currentDay={current.date}
					values={filters}
					onChangeHandlers={eventFiltersHandlers}
				/>
			</TaskListEventFiltersContainer>
			<FlexBlock
				direction={'column'}
				height={'100vh'}
				overflow={'scroll'}
				ml={-8}
				pl={8}
				mr={-8}
				pr={8}>
				<Loader
					title={'Обновляем список событий...'}
					isActive={isLoading || isFetching}
				>
					{isSuccess ? (
						<>
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
										/>))
									}
								</FlexBlock>
							) : (
								<NotFoundTask
									onAddTask={onAddTask}
									day={day}
									text={<>Событий по указанным фильтрам<br/>не найдено!</>}
									actions={<Button onClick={clearFiltersHandle}>Очистить фильтры</Button>}
								/>
							)}
						</>
					) : <></>}
				</Loader>
			</FlexBlock>
		
		</TaskListMainContainer>
	)
}

