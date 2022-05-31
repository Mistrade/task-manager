import {
  CalendarCurrentData,
  CalendarList,
  CalendarProps,
  CalendarTaskList, CustomObject,
  FullSizeCalendarProps, PartialCustomObject, TaskDate, TaskMonth, TaskStorage, TaskYear
} from './types'
import { FC, useEffect, useMemo, useState } from 'react'
import { getPickerDates } from '../../common/dayjs'
import {
  CalendarDateListContainer,
  CalendarDesktopContainer,
  CalendarTitle
} from './calendar.styled'
import { CalendarCell } from './cell'
import { MonthList } from '../../common/constants'
import dayjs from 'dayjs'

export let defaultTasksList: CalendarTaskList = [
  {
    title: 'Купить хлеб',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 31, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить молоко',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 28, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить машину',
    description: 'Какое-то описание дела',
    priority: 'high',
    time: dayjs( new Date( 2022, 4, 11, 18, 30 ) ),
    id: '1',
    isCompleted: true
  },
  {
    title: 'Купить ноутбук',
    description: 'Какое-то описание дела',
    priority: 'veryLow',
    time: dayjs( new Date( 2022, 4, 17, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить подарок',
    description: 'Какое-то описание дела',
    priority: 'low',
    time: dayjs( new Date( 2022, 4, 14, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Сходить в Халил',
    description: 'Какое-то описание дела',
    priority: 'veryHigh',
    time: dayjs( new Date( 2022, 4, 1, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Заправить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 22, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Написать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 21, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Протестировать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 9, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 14, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 17, 18, 30 ) ),
    id: '1'
  },
  {//
    title: 'Купить хлеб 2',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 1, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить молоко',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 2, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 3, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить ноутбук',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 4, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить подарок',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 5, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Сходить в Халил',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 6, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Заправить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 7, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Написать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 8, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Протестировать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 9, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 10, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 11, 18, 30 ) ),
    id: '1'
  },
  {//
    title: 'Купить хлеб 2',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 12, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить молоко',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 13, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 14, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить ноутбук',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 15, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить подарок',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 16, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Сходить в Халил',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 17, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Заправить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 17, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Написать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 18, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Протестировать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 19, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 20, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 21, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 22, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 23, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 24, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 25, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 26, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 27, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 28, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 29, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 30, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 31, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 32, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить хлеб',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 31, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить молоко',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 28, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 11, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить ноутбук',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 17, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить подарок',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 14, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Сходить в Халил',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 1, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Заправить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 22, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Написать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 21, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Протестировать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 9, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 14, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 17, 18, 30 ) ),
    id: '1'
  },
  {//
    title: 'Купить хлеб 2',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 1, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить молоко',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 2, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 3, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить ноутбук',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 4, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить подарок',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 5, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Сходить в Халил',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 6, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Заправить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 7, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Написать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 8, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Протестировать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 9, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 10, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 11, 18, 30 ) ),
    id: '1'
  },
  {//
    title: 'Купить хлеб 2',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 12, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить молоко',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 13, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 14, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить ноутбук',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 15, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить подарок',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 16, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Сходить в Халил',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 17, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Заправить машину',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 17, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Написать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 18, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Протестировать календарь',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 19, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 20, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 21, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 22, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 23, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 24, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 25, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 26, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 27, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 28, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 29, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 30, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Получить зарплату',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 31, 18, 30 ) ),
    id: '1'
  },
  {
    title: 'Купить телефон',
    description: 'Какое-то описание дела',
    priority: 'medium',
    time: dayjs( new Date( 2022, 4, 32, 18, 30 ) ),
    id: '1'
  }
]
console.log( 'всего задач: ', defaultTasksList.length )

const getTask = ( { year, month }: CalendarCurrentData, tasks: CalendarTaskList ): TaskStorage => {
  console.log( 'Перезапуск' )
  const start = new Date()
  const r: TaskStorage = {}

  tasks.forEach( ( task ) => {
    const y = task.time.year()
    const m = task.time.month()
    const d = task.time.date()

    const currentYear: TaskYear = r[ y ] || {}
    const currentMonth: TaskMonth = currentYear[ m ] || {}
    const currentDate: TaskDate = currentMonth[ d ] || []
    currentDate.push( task )

    currentMonth[ d ] = currentDate
    currentYear[ m ] = currentMonth
    r[ y ] = currentYear
  } )

  const end = new Date()
  console.log( `Время затраченное на упаковку списка задач из ${tasks?.length} элементов: ${end.getTime() - start.getTime()}мс.` )
  return r || {}
}

const FullSizeCalendar: FC<FullSizeCalendarProps> = ( {
                                                        list,
                                                        renderOption,
                                                        current,
                                                        tasksList,
                                                        addTasks
                                                      } ) => {
  const title = useMemo( () => {
    return `${MonthList[ current.month ]} ${current.year}г.`
  }, [current] )

  const taskList = useMemo( () => {
    console.log( 'useMemo' )
    return !!tasksList?.length ? getTask( current, tasksList ) : {}
  }, [current, tasksList] )

  return (
    <CalendarDesktopContainer>
      <CalendarTitle>
        {title}
      </CalendarTitle>
      <CalendarDateListContainer>
        {list.map( item => {
          const year = taskList[ item.value.year() ] || {}
          const month = year[ item.value.month() ] || {}
          const day = month[ item.value.date() ] || []
          return (
            <CalendarCell
              key={item.value.toDate().toString()}
              addTasks={addTasks}
              value={item}
              tasks={day || []}
              renderOption={renderOption}
            />
          )
        } )}
      </CalendarDateListContainer>
    </CalendarDesktopContainer>
  )
}

export const Calendar: FC<CalendarProps> = ( {
                                               current,
                                               renderOption = 'full-size',
                                               disabledOptions = {}
                                             } ) => {
  const calendarList: CalendarList = useMemo( () => {
    return getPickerDates( current, disabledOptions )
  }, [current] )

  const [tasksList, setTasksList] = useState( defaultTasksList )

  useEffect( () => {
    console.log( 'tasksList был изменен' )
  }, [tasksList] )

  if( renderOption === 'full-size' ) {
    return (
      <>
        <FullSizeCalendar
          current={current}
          list={calendarList}
          renderOption={renderOption}
          tasksList={tasksList}
          addTasks={( task ) => setTasksList( prev => {
            // console.log( 'Получено задание на добавление: ', task )
            // console.log( 'Длина предыдущего списка', prev.length )

            const newArr = [...prev]
            if( task ) {
              newArr.push( task )
            }

            // console.log( 'Длина обновленного списка', prev.length )
            return newArr
          } )}
        />
      </>
    )
  }

  if( renderOption === 'input-mode' ) {
    return (
      <>

      </>
    )
  }

  return <>Некорректное значение в prop: "renderOption"</>
}
