import {
	CalendarMode,
	OnAddTaskFnType,
	OnChangeCurrentFnType,
	OnCloseTaskInfoFnType,
	OnSelectTaskFnType,
	SelectedTaskType
} from '../components/Calendars/types'
import React, {useCallback, useMemo, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../store/hooks/hooks";
import {changeAddTaskDate, changeCalendarCurrent, changeCalendarRemoveCandidate} from "../store/reducers/calendar";
import {CalendarCurrentSelector} from "../store/selectors/calendarItems";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {CalendarNameItem} from "../components/Calendars/CalendarList/CalendarNameListItem";

interface Returned {
	current: CalendarMode,
	selectedTask: SelectedTaskType,
	setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTaskType>>,
	addTaskDate: Date | null,
	setAddTaskDate: (value: Date | null) => void,
	onSelectTask: OnSelectTaskFnType,
	onAddTask: OnAddTaskFnType,
	onChangeCurrent: OnChangeCurrentFnType,
	onCloseTaskInfo: OnCloseTaskInfoFnType,
	onCloseAddTaskModal: () => void,
	onCloseAddCalendarModal: () => void,
	onSelectToRemoveCalendar: (item: CalendarNameItem | null) => void,
	calendarRemoveCandidate: CalendarNameItem | null
}

export type UseCalendarType = () => Returned

export const useCalendar: UseCalendarType = () => {
	
	const current = useAppSelector(CalendarCurrentSelector)
	const navigate = useNavigate()
	const {calendarRemoveCandidate, addTaskDate} = useAppSelector(state => state.calendar)
	
	const [selectedTask, setSelectedTask] = useState<SelectedTaskType>(null)
	const dispatch = useAppDispatch()
	
	const updateAddTaskState = useCallback((value: Date | null) => {
		const date = dayjs(value)
		if (date.isValid()) {
			return dispatch(changeAddTaskDate(date.toString()))
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
		navigate(`/calendar/${current.layout}/${taskId}`)
	}, [setSelectedTask, current.layout])
	
	const onAddTask: OnAddTaskFnType = useCallback((date) => {
		navigate(`/calendar/${current.layout}/add`)
		updateAddTaskState(date)
	}, [updateAddTaskState, current.layout])
	
	const onChangeCurrent = useCallback((date: Date, l: CalendarMode['layout']) => {
		navigate(`/calendar/${l}`, {replace: true})
		dispatch(changeCalendarCurrent({layout: l, date: date.toString()}))
	}, [])
	
	const onCloseTaskInfo = useCallback(() => {
		navigate(`/calendar/${current.layout}`, {replace: true})
	}, [current.layout])
	
	const onCloseAddTaskModal = useCallback(() => {
		updateAddTaskState(null)
		navigate(`/calendar/${current.layout}`)
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
		calendarRemoveCandidate
	}
}
