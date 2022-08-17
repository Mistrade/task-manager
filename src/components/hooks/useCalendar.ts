import {
	AddTaskDateType,
	CalendarMode,
	OnAddTaskFnType,
	OnChangeCurrentFnType,
	OnSelectTaskFnType,
	SelectedTaskType
} from '../Calendars/types'
import React, {useCallback, useState} from 'react'

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

export type UseCalendarType = ( initialCurrent: CalendarMode ) => Returned

export const useCalendar: UseCalendarType = ( props ) => {

  const [current, setCurrent] = useState<CalendarMode>( props )
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
    selectedTask,
    setSelectedTask,
    addTaskDate,
    setAddTaskDate,
    onSelectTask,
    onAddTask,
    onChangeCurrent
  }
}
