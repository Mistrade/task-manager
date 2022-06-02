import {
  AddTaskModalProps,
  CalendarCurrentData, CalendarItem,
  CalendarList,
  CalendarProps,
  CalendarTaskList,
  CustomObject,
  FullSizeCalendarProps,
  PartialCustomObject, SelectTaskItem,
  TaskDate, TaskInfoModalProps,
  TaskMonth,
  TaskStorage,
  TaskTileClickArguments,
  TaskYear
} from './types'
import { FC, useEffect, useMemo, useState } from 'react'
import { getPickerDates } from '../../common/dayjs'
import {
  CalendarDateListContainer,
  CalendarDesktopContainer,
  CalendarTitle
} from './calendar.styled'
import { CalendarCell, TaskTileText } from './cell'
import { DATE_RENDER_FORMAT, defaultColor, MonthList, WeekDaysList } from '../../common/constants'
import dayjs from 'dayjs'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../Modal/modal'
import { TaskInformer } from './TaskInformer/taskInformer'
import { StyledButton } from '../Buttons/buttons.styled'
import { ModalProps } from '../Modal/types'
import Weekday from 'dayjs/plugin/weekday'
import { FlexBlock } from '../LayoutComponents/flexBlock'
import { getTaskListOfDay } from '../../common/functions'

export let defaultTasksList: CalendarTaskList = [
  {
    id: '1',
    title: 'Завершить написание модального окна',
    description: 'Необходимо завершить работу с модальным окном, чтобы информация по заданию выводилась корректно.',
    createdAt: new Date( 2022, 5, 1, 12, 20 ),
    priority: 'veryHigh',
    time: dayjs( new Date( 2022, 5, 1, 12, 20 ) ).add( 3, 'day' ).toDate(),
    members: [
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Проконтролировать акции в БКС',
    description: 'Необходимо проконтролировать акции в БКС, так как сильно меняются котировки. Возможно, будет шанс докупиться',
    createdAt: new Date(),
    priority: 'veryHigh',
    time: dayjs( new Date( 2022, 5, 1, 20, 50 ) ).toDate(),
    members: [
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      }, {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      }, {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Проконтролировать акции в БКС',
    description: 'Необходимо проконтролировать акции в БКС, так как сильно меняются котировки. Возможно, будет шанс докупиться',
    createdAt: new Date(),
    priority: 'veryHigh',
    time: dayjs( new Date( 2022, 5, 1, 20, 50 ) ).toDate(),
    members: [
      {
        name: 'Владос',
        surname: 'Валеев',
        patronymic: 'Ринатович',
        id: '1',
        gender: 'man',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      },
      {
        name: 'Лизок',
        surname: 'Жукова',
        patronymic: 'Юрьевна',
        id: '2',
        gender: 'woman',
        socialNetworks: [
          {
            networkName: 'vk',
            link: 'https://vk.com/yudakov2014'
          }
        ]
      }
    ]
  }
]

const getTask = ( { year, month }: CalendarCurrentData, tasks: CalendarTaskList ): TaskStorage => {
  const r: TaskStorage = {}

  tasks.forEach( ( task ) => {
    const y: number = dayjs( task.time ).year()
    const m: number = dayjs( task.time ).month()
    const d: number = dayjs( task.time ).date()

    const currentYear: TaskYear = r[ y ] || {}
    const currentMonth: TaskMonth = currentYear[ m ] || {}
    const currentDate: TaskDate = currentMonth[ d ] || []
    currentDate.push( task )

    currentMonth[ d ] = currentDate
    currentYear[ m ] = currentMonth
    r[ y ] = currentYear
  } )

  return r || {}
}

const FullSizeCalendar: FC<FullSizeCalendarProps> = ( {
                                                        list,
                                                        current,
                                                        tasksList,
                                                        onAddTask,
                                                        onSelectTask
                                                      } ) => {
  const title: string = useMemo( () => {
    return `${MonthList[ current.month ]} ${current.year}г.`
  }, [current] )

  const taskList: TaskStorage = useMemo( () => {
    return !!tasksList?.length ? getTask( current, tasksList ) : {}
  }, [current, tasksList] )

  return (
    <CalendarDesktopContainer>
      <CalendarTitle>
        {title}
      </CalendarTitle>

      <CalendarDateListContainer>
        {WeekDaysList.map( day => (
          <FlexBlock
            justify={'center'}
            width={'100%'}
            p={'12px 0px'}
            borderBottom={`1px solid ${defaultColor}`}
          >
            {day}
          </FlexBlock>
        ) )}
        {list.map( item => (
          <CalendarCell
            key={item.value.toString()}
            onAddTask={onAddTask}
            value={item}
            tasks={getTaskListOfDay( item, taskList )}
            onSelectTask={onSelectTask}
          />
        ) )}
      </CalendarDateListContainer>
    </CalendarDesktopContainer>
  )
}


const TaskInfoModal: FC<TaskInfoModalProps> = ( { selectedTask, onClose } ) => {
  return (
    <Modal
      isView={!!selectedTask}
      onClose={() => onClose()}
    >
      <ModalHeader>
        <TaskTileText maxWidth={'100%'} fs={'18px'} data-title={selectedTask?.taskInfo.title}>
          {selectedTask?.taskInfo.title}
        </TaskTileText>
      </ModalHeader>
      <ModalBody>
        <TaskInformer taskItem={selectedTask}/>
      </ModalBody>
      <ModalFooter>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%'
        }}>

          <StyledButton>
            Ок
          </StyledButton>
          <StyledButton
            onClick={() => onClose()}
            fillColor={'#fff'}
            textColor={defaultColor}
          >
            Закрыть
          </StyledButton>
        </div>
      </ModalFooter>
    </Modal>
  )
}

const AddTaskModal: FC<AddTaskModalProps> = ( { date, onClose, onComplete } ) => {
  return (
    <Modal
      isView={!!date}
      onClose={onClose}
    >
      <ModalHeader>
        <TaskTileText maxWidth={'100%'} fs={'18px'}>
          Добавить задание на {dayjs( date?.value ).format( DATE_RENDER_FORMAT )}
        </TaskTileText>
      </ModalHeader>
      <ModalBody>
      </ModalBody>
      <ModalFooter>
        <FlexBlock justify={'flex-end'} align={'center'} width={'100%'}>
          <StyledButton onClick={() => onComplete && onComplete()}>
            Ок
          </StyledButton>
          <StyledButton
            onClick={() => onClose && onClose()}
            fillColor={'#fff'}
            textColor={defaultColor}
          >
            Закрыть
          </StyledButton>
        </FlexBlock>
      </ModalFooter>
    </Modal>
  )
}

export const Calendar: FC<CalendarProps> = ( {
                                               current,
                                               disabledOptions = {}
                                             } ) => {
  const calendarList: CalendarList = useMemo( () => {
    return getPickerDates( current, disabledOptions )
  }, [current] )

  const [tasksList, setTasksList] = useState( defaultTasksList )
  const [selectedTask, setSelectedTask] = useState<SelectTaskItem | null>( null )
  const [addTaskDate, setAddTaskDate] = useState<CalendarItem | null>( null )

  const onSelectTask: FullSizeCalendarProps['onSelectTask'] = ( data ) => {
    setSelectedTask( { ...data } )
  }

  const onAddTask: FullSizeCalendarProps['onAddTask'] = ( date ) => {
    setAddTaskDate( date )
  }

  return (
    <FlexBlock position={'relative'}>
      <FullSizeCalendar
        current={current}
        list={calendarList}
        tasksList={tasksList}
        onAddTask={onAddTask}
        onSelectTask={onSelectTask}
      />
      <AddTaskModal
        date={addTaskDate}
        onClose={() => setAddTaskDate( null )}
      />
      <TaskInfoModal
        selectedTask={selectedTask}
        onClose={() => setSelectedTask( null )}
      />
    </FlexBlock>
  )
}
