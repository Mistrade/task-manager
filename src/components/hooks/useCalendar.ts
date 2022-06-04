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
import { getPickerDates } from '../../common/dayjs'
import { defaultTasksList } from '../../common/constants'
import dayjs from 'dayjs'

interface Returned {
  current: CalendarMode,
  calendarList: CalendarWeekList,
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
  const calendarList: CalendarWeekList = useMemo( () => {
    return getPickerDates( current, disabledOptions )
  }, [current] )


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
          week: dayjs( date ).week(),
          year: date.getFullYear()
        } )
      case 'day':
        return setCurrent( {
          layout,
          date
        } )
    }
  }, [setCurrent] )

  return {
    current,
    calendarList,
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
