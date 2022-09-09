import {
	CalendarMode,
	OnAddTaskFnType,
	OnChangeCurrentFnType,
	OnCloseTaskInfoFnType,
	OnSelectTaskFnType,
	SelectedTaskType
} from '../components/Calendars/types'
import React, {useCallback, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../store/hooks/hooks";
import {changeCalendarCurrent} from "../store/reducers/calendar";
import {CalendarCurrentSelector} from "../store/selectors/calendarItems";
import {useNavigate} from "react-router-dom";

interface Returned {
	current: CalendarMode,
	selectedTask: SelectedTaskType,
	setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTaskType>>,
	addTaskDate: Date | null,
	setAddTaskDate: React.Dispatch<React.SetStateAction<Date | null>>,
	onSelectTask: OnSelectTaskFnType,
	onAddTask: OnAddTaskFnType,
	onChangeCurrent: OnChangeCurrentFnType,
	onCloseTaskInfo: OnCloseTaskInfoFnType,
	onCloseAddTaskModal: () => void
}

export type UseCalendarType = () => Returned

export const useCalendar: UseCalendarType = () => {
	
	const current = useAppSelector(CalendarCurrentSelector)
	const navigate = useNavigate()
	
	const [selectedTask, setSelectedTask] = useState<SelectedTaskType>(null)
	const [addTaskDate, setAddTaskDate] = useState<Date | null>(null)
	const dispatch = useAppDispatch()
	
	const onSelectTask: OnSelectTaskFnType = useCallback((taskId: string) => {
		navigate(`/calendar/${current.layout}/${taskId}`)
	}, [setSelectedTask, current.layout])
	
	const onAddTask: OnAddTaskFnType = useCallback((date) => {
		navigate(`/calendar/${current.layout}/add`)
		setAddTaskDate(date)
	}, [setAddTaskDate, current.layout])
	
	const onChangeCurrent = useCallback((date: Date, l: CalendarMode['layout']) => {
		navigate(`/calendar/${l}`, {replace: true})
		dispatch(changeCalendarCurrent({layout: l, date: date.toString()}))
	}, [])
	
	const onCloseTaskInfo = useCallback(() => {
		navigate(`/calendar/${current.layout}`, {replace: true})
	}, [current.layout])
	
	const onCloseAddTaskModal = useCallback(() => {
		setAddTaskDate(null)
		navigate(`/calendar/${current.layout}`)
	}, [current.layout])
	
	return {
		current,
		selectedTask,
		setSelectedTask,
		addTaskDate,
		setAddTaskDate,
		onSelectTask,
		onAddTask,
		onChangeCurrent,
		onCloseTaskInfo,
		onCloseAddTaskModal
	}
}
