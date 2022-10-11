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
	changeCalendarRemoveCandidate,
	setClonedParentEvent
} from "../store/reducers/calendar";
import {CalendarCurrentSelector} from "../store/selectors/calendarItems";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {CalendarNameItem} from "../components/Calendars/CalendarList/CalendarNameListItem";
import {FullResponseEventModel} from "../store/api/taskApi/types";
import {toast} from "react-toastify";

interface Returned {
	current: CalendarMode,
	selectedTask: SelectedTaskType,
	setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTaskType>>,
	addTaskDate: Date | null,
	setAddTaskDate: (value: Date | null, initialValues?: FullResponseEventModel | null) => void,
	onSelectTask: OnSelectTaskFnType,
	onAddTask: OnAddTaskFnType,
	onChangeCurrent: OnChangeCurrentFnType,
	onCloseTaskInfo: OnCloseTaskInfoFnType,
	onCloseAddTaskModal: () => void,
	onCloseAddCalendarModal: () => void,
	onSelectToRemoveCalendar: (item: CalendarNameItem | null) => void,
	calendarRemoveCandidate: CalendarNameItem | null,
	onCloneEvent: (initialValues: FullResponseEventModel) => void,
	clonedEventInfo: FullResponseEventModel | null
}

export type UseCalendarType = () => Returned

export const useCalendar: UseCalendarType = () => {
	
	const current = useAppSelector(CalendarCurrentSelector)
	const navigate = useNavigate()
	const {calendarRemoveCandidate, addTaskDate, clonedParentEvent} = useAppSelector(state => state.calendar)
	
	useEffect(() => {
		console.log(clonedParentEvent)
	}, [clonedParentEvent])
	
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
	
	const onSelectToRemoveCalendar = useCallback((item: CalendarNameItem | null) => {
		dispatch(changeCalendarRemoveCandidate(item))
	}, [calendarRemoveCandidate, current.layout])
	
	const onCloseAddCalendarModal = useCallback(() => {
		return navigate(`/calendar/${current.layout}`)
	}, [current.layout])
	
	const onSelectTask: OnSelectTaskFnType = useCallback((taskId: string) => {
		console.log('click')
		navigate(`/calendar/${current.layout}/${taskId}`)
	}, [setSelectedTask, current.layout])
	
	const onAddTask: OnAddTaskFnType = useCallback((date, initialValues) => {
		navigate(`/calendar/${current.layout}/add`)
		updateAddTaskState(date, initialValues || null)
	}, [updateAddTaskState, current.layout])
	
	const onChangeCurrent = useCallback((date: Date, l: CalendarMode['layout']) => {
		navigate(`/calendar/${l}`, {replace: true})
		dispatch(changeCalendarCurrent({layout: l, date: date.toString()}))
	}, [])
	
	const onCloseTaskInfo = useCallback(() => {
		navigate(`/calendar/${current.layout}`, {replace: true})
	}, [current.layout])
	
	const onCloseAddTaskModal = useCallback(() => {
		updateAddTaskState(null, null)
		navigate(`/calendar/${current.layout}`)
	}, [current.layout])
	
	const onCloneEvent = useCallback((event: FullResponseEventModel) => {
		
		console.log(event)
		const date = dayjs(event.time)
		if (date.isValid()) {
			console.log('дата валидна')
			onCloseTaskInfo()
			onAddTask(dayjs(event.time).toDate(), event)
		} else {
			toast('Не удалось клонировать событие', {type: 'warning'})
		}
		
	}, [])
	
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
		clonedEventInfo: clonedParentEvent
	}
}
