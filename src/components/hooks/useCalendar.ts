import {
	AddTaskDateType,
	CalendarMode,
	OnAddTaskFnType,
	OnChangeCurrentFnType,
	OnSelectTaskFnType,
	SelectedTaskType
} from '../Calendars/types'
import React, {useCallback, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../store/hooks/hooks";
import {Nullable} from "../../types";
import {changeCalendarCurrent} from "../../store/reducers/calendar";
import {ChangeCurrentFnType} from "../../common/commonTypes";
import {useCalendarCurrentSelector} from "../../store/selectors/calendarItems";
import {useNavigate} from "react-router-dom";

interface Returned {
	current: CalendarMode,
	selectedTask: SelectedTaskType,
	setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTaskType>>,
	addTaskDate: AddTaskDateType,
	setAddTaskDate: React.Dispatch<React.SetStateAction<AddTaskDateType>>,
	onSelectTask: OnSelectTaskFnType,
	onAddTask: OnAddTaskFnType,
	onChangeCurrent: OnChangeCurrentFnType
}

export type UseCalendarType = (layout?: CalendarMode['layout']) => Returned

export const useCalendar: UseCalendarType = (layout) => {
	
	const current = useAppSelector(useCalendarCurrentSelector)
	const navigate = useNavigate()
	
	const [selectedTask, setSelectedTask] = useState<SelectedTaskType>(null)
	const [addTaskDate, setAddTaskDate] = useState<AddTaskDateType>(null)
	const dispatch = useAppDispatch()
	const onSelectTask: OnSelectTaskFnType = useCallback((data) => {
		setSelectedTask({...data})
	}, [setSelectedTask])
	
	const onAddTask: OnAddTaskFnType = useCallback((date) => {
		setAddTaskDate(date)
	}, [setAddTaskDate])
	
	const onChangeCurrent = useCallback((date: Date, l: CalendarMode['layout']) => {
		
		// if (l !== layout && layout) {
		navigate(`/calendar/${l}`, {replace: true})
		// }
		
		dispatch(changeCalendarCurrent({layout: l, date: date.toString()}))
	}, [])
	
	return {
		current,
		selectedTask,
		setSelectedTask,
		addTaskDate,
		setAddTaskDate,
		onSelectTask,
		onAddTask,
		onChangeCurrent
	}
}
