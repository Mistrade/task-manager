import {
  AddTaskModalProps,
  CalendarItem,
  CalendarList,
  CalendarProps,
  FullSizeCalendarProps,
  SelectTaskItem,
  TaskInfoModalProps,
  TaskStorage
} from './types'
import { FC, useMemo, useState } from 'react'
import { getPickerDates } from '../../common/dayjs'
import {
  CalendarDateListContainer,
  CalendarDesktopContainer,
  CalendarTitle
} from './calendar.styled'
import { CalendarCell, TaskTileText } from './cell'
import {
  DATE_RENDER_FORMAT,
  defaultColor,
  defaultTasksList,
  MonthList,
  WeekDaysList
} from '../../common/constants'
import dayjs from 'dayjs'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../Modal/modal'
import { TaskInformer } from './TaskInformer/taskInformer'
import { StyledButton } from '../Buttons/buttons.styled'
import { FlexBlock } from '../LayoutComponents/flexBlock'
import { getTaskListOfDay, getTaskStorage } from '../../common/functions'

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
    return !!tasksList?.length ? getTaskStorage( current, tasksList ) : {}
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
        <FlexBlock justify={'end'} align={'center'} width={'100%'}>
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
        </FlexBlock>
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
