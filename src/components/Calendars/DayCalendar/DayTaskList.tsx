import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from 'react'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {
	CalendarCurrentDay,
	CalendarItem,
	CalendarPriorityKeys,
	EventItem,
	GlobalTaskListProps,
	OnSelectTaskFnType
} from '../types'
import {ArrowIndicator} from '../Cell'
import dayjs from 'dayjs'
import {defaultColor, hoverColor} from '../../../common/constants'
import styled, {css} from 'styled-components'
import {NotFoundIcon} from '../../Icons/Icons'
import {Button, JoinToEventButton} from '../../Buttons/Buttons.styled'
import {useFormik} from 'formik'
import {EventFilter, EventFilterOnChangeHandle} from './EventFilter'
import {ShortEventItem, useGetTasksAtDayQuery, useRemoveTaskMutation} from "../../../store/api/taskApi";
import {useDebounce} from "../../../hooks/useDebounce";
import {Loader} from "../../Loaders/Loader";

interface DayTaskListProps extends GlobalTaskListProps {
	day: CalendarItem
	current: CalendarCurrentDay,
	onSelectTask?: OnSelectTaskFnType,
}

export interface NotFoundTaskProps extends Omit<GlobalTaskListProps, 'renderTaskCount'> {
	day: CalendarItem,
	text?: ReactNode,
	actions?: ReactNode
}

interface DayTaskItemProps {
	taskInfo: ShortEventItem,
	tabIndex: number
	onSelectTask?: OnSelectTaskFnType,
	day: CalendarItem,
	onDelete?: (id: string) => void
}

const TileMixin = css`
  & {
    cursor: pointer;
    box-shadow: none;
    transition: box-shadow .3s ease-in-out;
  }

  &:hover {
    box-shadow: 0px 0px 4px ${defaultColor};
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`

const NotFoundTitle = styled('h2')`
  & {
    font-size: 24px;
    color: ${defaultColor};
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-bottom: 24px;
  }
`

export const NotFoundTask: FC<NotFoundTaskProps> = ({onAddTask, day, text, actions}) => {
	return (
		<FlexBlock
			height={400}
			minWidth={300}
			maxWidth={'100%'}
			direction={'column'}
			align={'center'}
			justify={'flex-start'}
		>
			<FlexBlock mb={12}>
				<NotFoundIcon/>
			</FlexBlock>
			<NotFoundTitle>
				{text || <>Событий, назначенных на текущую дату,<br/> не найдено</>}
			</NotFoundTitle>
			<FlexBlock direction={'column'} gap={16}>
				<Button
					onClick={() => onAddTask && day && onAddTask(day)}
				>
					Добавить событие
				</Button>
				{actions}
			</FlexBlock>
		</FlexBlock>
	)
}

export interface DayTaskListFilters {
	title: string | null,
	priority: null | CalendarPriorityKeys,
	start: null | Date,
	end: null | Date
}

const initialFiltersValues: (day: Date) => DayTaskListFilters = (day) => ({
	title: null,
	priority: null,
	start: dayjs(day).startOf('day').toDate(),
	end: dayjs(day).endOf('day').toDate()
})

console.log(initialFiltersValues)
export const DayTaskList: FC<DayTaskListProps> = ({
																										current,
																										onSelectTask,
																										day,
																										onAddTask
																									}) => {
	const [filters, setFilters] = useState<DayTaskListFilters>(initialFiltersValues(day.value))
	
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
		priority: (key) => changeFiltersStateHandler('priority', key === 'not_selected' ? null : key)
	}), [])
	
	const {data, isLoading, isError, isSuccess, isFetching} = useGetTasksAtDayQuery({
		fromDate:
			debounceValue.start
				? dayjs(debounceValue.start).utc().toString()
				: dayjs(day.value).utc().toString(),
		toDate:
			debounceValue.end
				? dayjs(debounceValue.end).utc().toString()
				: dayjs(day.value).add(23, 'hour').add(59, 'minute').utc().toString(),
		title: debounceValue.title,
		priority: debounceValue.priority === 'not_selected' ? null : debounceValue.priority
	}, {refetchOnMountOrArgChange: true})
	
	const [removeTask, {isSuccess: isRemoveSuccess, isError: isRemoveError}] = useRemoveTaskMutation()
	
	useEffect(() => {
		clearFiltersHandle()
	}, [day.value])
	
	const clearFiltersHandle = useCallback(() => {
		setFilters(initialFiltersValues(day.value))
	}, [day.value])
	
	
	return (
		<FlexBlock
			direction={'column'}
			width={'100%'}
			height={'90vh'}
			overflow={'scroll'}
			grow={10}
			// pt={4}
			pb={24}
			ml={-8}
			pl={8}
			mr={-8}
			pr={8}
		>
			<FlexBlock
				pb={24}
				
				pt={24}
				justify={'flex-start'}
				wrap={'nowrap'}
				bgColor={'#fff'}
				width={'calc(100%)'}
				additionalCss={css`gap: 12px;
          top: 0;
          left: 0;
          z-index: 1
				`}
				position={'sticky'}
			>
				<EventFilter
					currentDay={current.date}
					values={filters}
					onChangeHandlers={eventFiltersHandlers}
				/>
			
			</FlexBlock>
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
	)
}

export const DayTaskItem: FC<DayTaskItemProps> = ({taskInfo, tabIndex, onSelectTask, day, onDelete}) => {
	const start = dayjs(taskInfo.time).format('DD-MM HH:mm')
	const end = dayjs(taskInfo.timeEnd).format('DD-MM HH:mm')
	
	const setTaskInfo = useCallback(() => {
		if (onSelectTask) {
			onSelectTask(taskInfo.id)
		}
	}, [onSelectTask, taskInfo, day])
	
	const keyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			setTaskInfo()
		}
	}
	
	const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setTaskInfo()
	}
	
	return (
		<FlexBlock
			direction={'row'}
			align={'center'}
			wrap={'nowrap'}
			width={'100%'}
			borderRadius={4}
			role={'button'}
			tabIndex={tabIndex}
			bgColor={hoverColor}
			onKeyPress={keyPressHandler}
			onClick={clickHandler}
			additionalCss={css`
        ${TileMixin};
			`}
			p={'8px 12px'}
		>
			<FlexBlock shrink={0}>
				<ArrowIndicator
					priorityKey={taskInfo.priority}
					isCompleted={taskInfo.status === 'completed'}
				/>
			</FlexBlock>
			<FlexBlock direction={'row'} width={'100%'}>
				<FlexBlock direction={'column'} shrink={0} minWidth={130} pl={8} mr={16} gap={4}>
					<FlexBlock>
						<span style={{color: defaultColor}}>с {start}</span>
					</FlexBlock>
					<FlexBlock>
						<span style={{color: defaultColor}}>до {end}</span>
					</FlexBlock>
				</FlexBlock>
				<FlexBlock
					grow={10}
					gap={6}
					justify={'flex-start'}
					align={'flex-start'}
					direction={'row'}
					width={'100%'}
				>
					<FlexBlock width={'100%'}>
						{taskInfo.title}
					</FlexBlock>
					{taskInfo.link?.value && (
						<FlexBlock>
							<JoinToEventButton
								href={taskInfo.link.value}
								target={'_blank'}
								rel={''}
								onClick={(e) => e.stopPropagation()}
							>
								Подключиться
							</JoinToEventButton>
						</FlexBlock>
					)}
					{taskInfo.id && (
						<FlexBlock>
							<JoinToEventButton
								onClick={(e) => {
									e.stopPropagation()
									onDelete && onDelete(taskInfo.id)
								}}
							>
								Удалить
							</JoinToEventButton>
						</FlexBlock>
					)}
				</FlexBlock>
			</FlexBlock>
		</FlexBlock>
	)
}
