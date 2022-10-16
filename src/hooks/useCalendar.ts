import {
	CalendarMode, CalendarTaskItem,
	OnAddTaskFnType,
	OnChangeCurrentFnType,
	OnCloseTaskInfoFnType,
	OnSelectTaskFnType,
	SelectedTaskType
} from '../components/Calendars/types'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../store/hooks/hooks";
import {
	changeAddTaskDate,
	changeCalendarCurrent,
	changeCalendarRemoveCandidate, changeTaskStatuses,
	setClonedParentEvent
} from "../store/reducers/calendar";
import {CalendarCurrentSelector} from "../store/selectors/calendarItems";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {CalendarNameItem} from "../components/Calendars/CalendarList/CalendarNameListItem";
import {FullResponseEventModel, ObjectId} from "../store/api/taskApi/types";
import {toast} from "react-toastify";
import {FilterTaskStatuses} from "../components/Calendars/Modes/DayCalendar/EventFilter";

export interface UseCalendarReturned {
	current: CalendarMode,
	selectedTask: SelectedTaskType,
	setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTaskType>>,
	addTaskDate: Date | null,
	setAddTaskDate: (value: Date | null, initialValues?: FullResponseEventModel | null) => void,
	onSelectTask: OnSelectTaskFnType,
	onAddTask: OnAddTaskFnType,
	onChangeCurrent: OnChangeCurrentFnType,
	onCloseTaskInfo: OnCloseTaskInfoFnType,
	onCloseAddTaskModal: (taskStatus?: FilterTaskStatuses) => void,
	onCloseAddCalendarModal: () => void,
	onSelectToRemoveCalendar: (item: CalendarNameItem | null) => void,
	calendarRemoveCandidate: CalendarNameItem | null,
	onCloneEvent: (initialValues: FullResponseEventModel) => void,
	clonedEventInfo: FullResponseEventModel | null,
	onSuccessClonedEvent: (date: Date, taskStatus: FilterTaskStatuses, taskId?: ObjectId) => void,
	onAddCalendar: (calendarId?: ObjectId) => void
}

export type UseCalendarType = () => UseCalendarReturned

export const useCalendar: UseCalendarType = () => {
	
	const current = useAppSelector(CalendarCurrentSelector)
	const navigate = useNavigate()
	const {calendarRemoveCandidate, addTaskDate, clonedParentEvent, statuses} = useAppSelector(state => state.calendar)
	
	const [selectedTask, setSelectedTask] = useState<SelectedTaskType>(null)
	const dispatch = useAppDispatch()
	
	const updateAddTaskState = useCallback((value: Date | null, initialValues?: FullResponseEventModel | null) => {
		const date = dayjs(value)
		if (date.isValid()) {
			dispatch(changeAddTaskDate(date.toString()))
			dispatch(setClonedParentEvent(initialValues || null))
			return
		}
		
		return dispatch(changeAddTaskDate(null))
	}, [])
	
	const addTaskDateState: Date | null = useMemo(() => {
		const date = dayjs(addTaskDate)
		
		if (date.isValid()) {
			return date.toDate()
		}
		
		return null
	}, [addTaskDate])
	
	const onAddCalendar: UseCalendarReturned['onAddCalendar'] = useCallback((calendarId) => {
		const defaultPath = `/calendar/${current.layout}/${statuses}/calendar`
		navigate(calendarId
			? `${defaultPath}/${calendarId}`
			: defaultPath
		)
	}, [statuses, current.layout])
	
	const onSelectToRemoveCalendar = useCallback((item: CalendarNameItem | null) => {
		dispatch(changeCalendarRemoveCandidate(item))
	}, [calendarRemoveCandidate, current.layout])
	
	const onCloseAddCalendarModal = useCallback(() => {
		return navigate(`/calendar/${current.layout}/${statuses}`)
	}, [current.layout, statuses])
	
	const onSelectTask: OnSelectTaskFnType = useCallback((taskId: string) => {
		navigate(`/calendar/${current.layout}/${statuses}/${taskId}`)
	}, [setSelectedTask, current.layout, statuses])
	
	const onAddTask: OnAddTaskFnType = useCallback((date, initialValues) => {
		navigate(`/calendar/${current.layout}/${statuses}/add`)
		updateAddTaskState(date, initialValues || null)
	}, [current.layout, statuses])
	
	const onChangeCurrent: UseCalendarReturned['onChangeCurrent'] = useCallback((date, l) => {
		navigate(`/calendar/${l}/${statuses}`, {replace: true})
		if ('fromDate' in date || 'toDate' in date) {
			dispatch(changeCalendarCurrent({
				layout: date.layout,
				date: {
					layout: date.layout,
					fromDate: date.fromDate.toString(),
					toDate: date.toDate.toString(),
				}
			}))
		} else {
			dispatch(changeCalendarCurrent({layout: l, date: date.toString()}))
		}
	}, [statuses])
	
	const onCloseTaskInfo = useCallback(() => {
		navigate(`/calendar/${current.layout}/${statuses}`, {replace: true})
	}, [current.layout, statuses])
	
	const onCloseAddTaskModal = useCallback((taskStatus?: FilterTaskStatuses, taskId?: ObjectId) => {
		updateAddTaskState(null, null)
		const defaultPath = `/calendar/${current.layout}/${taskStatus || statuses}`
		navigate(taskId ? `${defaultPath}/${taskId}` : defaultPath, {replace: true})
	}, [current.layout, statuses])
	
	const onCloneEvent = useCallback((event: FullResponseEventModel) => {
		const date = dayjs(event.time)
		if (date.isValid()) {
			onAddTask(dayjs(event.time).toDate(), event)
		} else {
			toast('Не удалось клонировать событие', {type: 'warning'})
		}
		
	}, [statuses, current.layout])
	
	const onSuccessClonedEvent: UseCalendarReturned['onSuccessClonedEvent'] = useCallback((date, taskStatus, taskId) => {
		dispatch(changeTaskStatuses(taskStatus))
		dispatch(changeCalendarCurrent({layout: current.layout, date: date.toString()}))
		onCloseAddTaskModal(taskStatus, taskId)
	}, [current.layout])
	
	return {
		current,
		selectedTask,
		setSelectedTask,
		addTaskDate: addTaskDateState,
		setAddTaskDate: updateAddTaskState,
		onSelectTask,
		onAddTask,
		onChangeCurrent,
		onCloseTaskInfo,
		onCloseAddTaskModal,
		onCloseAddCalendarModal,
		onSelectToRemoveCalendar,
		calendarRemoveCandidate,
		onCloneEvent,
		clonedEventInfo: clonedParentEvent,
		onSuccessClonedEvent: onSuccessClonedEvent,
		onAddCalendar
	}
}
