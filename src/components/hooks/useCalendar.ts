import {
  AddTaskDateType,
  CalendarCurrentData,
  CalendarItem,
  CalendarList, CalendarMode,
  CalendarProps,
  CalendarTaskList, CalendarWeekList,
  OnAddTaskFnType,
  OnChangeCurrentFnType,
  OnSelectTaskFnType,
  SelectedTaskType,
  SelectTaskItem,
  TaskTileClickArguments
} from '../Calendars/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { defaultTasksList } from '../../common/constants'
import dayjs from 'dayjs'
import { getMonthDays } from '../../common/calendarSupport/getters'

interface Returned {
  current: CalendarMode,
  tasksList: CalendarTaskList,
  setTasksList: React.Dispatch<React.SetStateAction<CalendarTaskList>>,
  selectedTask: SelectedTaskType,
  setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTaskType>>,
  addTaskDate: AddTaskDateType,
  setAddTaskDate: React.Dispatch<React.SetStateAction<AddTaskDateType>>,
  onSelectTask: OnSelectTaskFnType,
  onAddTask: OnAddTaskFnType,
  onChangeCurrent: OnChangeCurrentFnType
}

export type UseCalendarType = ( data: CalendarProps ) => Returned

export const useCalendar: UseCalendarType = ( {
                                                initialCurrent,
                                                renderWeekPattern,
                                                disabledOptions = {}
                                              } ) => {

  const [current, setCurrent] = useState<CalendarMode>( initialCurrent )

  //TODO перенести CalendarList в компонент MonthCalendar

  //TODO переделать tasksList на тип TaskStorage
  const [tasksList, setTasksList] = useState<CalendarTaskList>( defaultTasksList )
  const [selectedTask, setSelectedTask] = useState<SelectedTaskType>( null )
  const [addTaskDate, setAddTaskDate] = useState<AddTaskDateType>( null )

  const onSelectTask: OnSelectTaskFnType = useCallback( ( data ) => {
    setSelectedTask( { ...data } )
  }, [setSelectedTask] )

  const onAddTask: OnAddTaskFnType = useCallback( ( date ) => {
    setAddTaskDate( date )
  }, [setAddTaskDate] )

  const onChangeCurrent: OnChangeCurrentFnType = useCallback( ( date, layout ) => {
    switch (layout) {
      case 'month':
        return setCurrent( {
          layout,
          month: date.getMonth(),
          year: date.getFullYear()
        } )
      case 'week':
        return setCurrent( {
          layout,
          aroundDate: date
        } )
      case 'day':
        return setCurrent( {
          layout,
          date
        } )
      case 'year':
        return setCurrent( {
          layout: 'year',
          year: date.getFullYear()
        } )
    }
  }, [setCurrent] )

  return {
    current,
    tasksList,
    setTasksList,
    selectedTask,
    setSelectedTask,
    addTaskDate,
    setAddTaskDate,
    onSelectTask,
    onAddTask,
    onChangeCurrent
  }
}
