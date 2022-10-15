import {EventFilterOnChangeHandle, FilterTaskStatuses} from "../components/Calendars/DayCalendar/EventFilter";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDebounce} from "./useDebounce";
import {CalendarMode, CalendarPriorityKeys} from "../components/Calendars/types";
import {useGetTasksAtDayQuery} from "../store/api/taskApi/taskApi";
import dayjs from "dayjs";
import {current} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../store/hooks/hooks";
import {changeTaskStatuses} from "../store/reducers/calendar";

export interface EventFilters {
	title: string | null,
	priority: null | CalendarPriorityKeys,
	start: Date,
	end: Date,
	taskStatus: FilterTaskStatuses
}


export interface UseEventFiltersProps {
	initialValues: EventFilters,
	layout: CalendarMode['layout']
}

export interface UseEventFiltersReturned {
	handlers: EventFilterOnChangeHandle,
	setFiltersState: (values: EventFilters) => void,
	filters: EventFilters,
	debounceValue: EventFilters,
}

export type UseEventFiltersType = (options: UseEventFiltersProps) => UseEventFiltersReturned

export const initialFiltersValues: (day: Date, taskStatus: FilterTaskStatuses) => EventFilters = (day, taskStatus) => ({
	title: null,
	priority: null,
	start: dayjs(day).startOf('day').toDate(),
	end: dayjs(day).endOf('day').toDate(),
	taskStatus
})

export const useEventFilters: UseEventFiltersType = ({
																											 initialValues,
																											 layout
																										 }) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [filters, setFilters] = useState<EventFilters>(initialValues)
	
	const debounceValue = useDebounce(filters, 300)
	
	const changeFiltersStateHandler = <T extends keyof EventFilters>(fieldName: T, value: EventFilters[T]) => {
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
		taskStatus: (value) => {
			navigate(`/calendar/${layout}/${value}`)
			dispatch(changeTaskStatuses(value))
			changeFiltersStateHandler('taskStatus', value)
		}
	}), [layout])
	
	const setFiltersState = useCallback((values: EventFilters) => {
		setFilters(values)
	}, [])
	
	return {
		handlers: eventFiltersHandlers,
		setFiltersState,
		filters: filters,
		debounceValue: debounceValue
	}
}
