import {
  AddTaskModalProps,
  CalendarBodyProps,
  CalendarBodyTitleProps,
  CalendarProps,
  TaskInfoModalProps,
  TaskStorage,
  WeekListProps
} from './types'
import { FC, useCallback, useMemo } from 'react'
import {
  CalendarDateListContainer,
  CalendarDesktopContainer,
  CalendarTitle
} from './calendar.styled'
import { CalendarCell, TaskTileText } from './cell'
import {
  DATE_RENDER_FORMAT,
  defaultColor,
  MonthList,
  WeekDaysList,
  WeekDaysShortList
} from '../../common/constants'
import dayjs from 'dayjs'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../Modal/modal'
import { TaskInformer } from './TaskInformer/taskInformer'
import { StyledButton } from '../Buttons/buttons.styled'
import { FlexBlock } from '../LayoutComponents/flexBlock'
import { changeCurrentHandler, getTaskListOfDay, getTaskStorage } from '../../common/functions'
import { Arrow, DoubleArrow } from '../Icons/icons'
import { HoverElementMixin } from '../../common/cssMixins'
import { ChangeCurrentPattern } from '../../common/commonTypes'
import { useCalendar } from '../hooks/useCalendar'

const CalendarBodyTitle: FC<CalendarBodyTitleProps> = ( {
                                                          current,
                                                          onChangeCurrent,
                                                          renderWeekPattern
                                                        } ) => {
  const title: string = useMemo( () => {
    return `${MonthList[ current.month ]} ${current.year}г.`
  }, [current] )

  const onChangeCurrentHandler = useCallback( ( pattern: ChangeCurrentPattern = 'today' ) => {
    if( onChangeCurrent ) {
      onChangeCurrent( changeCurrentHandler( current, pattern ) )
    }
  }, [current] )

  return (
    <FlexBlock
      direction={'column'}
      width={'100%'}
      pb={8}
      pt={8}
      bgColor={'#fff'}
      position={'sticky'}
      style={{ top: 0, left: 0, zIndex: 10 }}
    >
      <FlexBlock
        width={'100%'}
        justify={'space-between'}
        align={'center'}
        mb={8}
      >
        <FlexBlock justify={'flex-start'} align={'center'}>
          <CalendarTitle>
            {title}
          </CalendarTitle>
        </FlexBlock>
        <FlexBlock justify={'flex-end'} align={'center'}>
          <DoubleArrow
            onClick={() => onChangeCurrentHandler( '-year' )}
            size={20}
            transform={'rotate(180deg)'}
            mr={6}
          />
          <Arrow
            onClick={() => onChangeCurrentHandler( '-month' )}
            size={20}
            transform={'rotate(180deg)'}
            mr={6}
          />
          <FlexBlock
            mr={6}
            p={'6px 16px'}
            border={`1px solid ${defaultColor}`}
            borderRadius={4}
            additionalCss={HoverElementMixin}
            onClick={() => onChangeCurrentHandler( 'today' )}
          >
            Сегодня
          </FlexBlock>
          <Arrow
            mr={6}
            size={20}
            onClick={() => onChangeCurrentHandler( '+month' )}
          />
          <DoubleArrow
            size={20}
            onClick={() => onChangeCurrentHandler( '+year' )}
          />
        </FlexBlock>
      </FlexBlock>
      <CalendarDateListContainer>
        <WeekList renderWeekPattern={renderWeekPattern}/>
      </CalendarDateListContainer>
    </FlexBlock>
  )
}

const WeekList: FC<WeekListProps> = ( { renderWeekPattern } ) => {
  if( renderWeekPattern === 'full' ) {
    return (
      <>
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
      </>
    )
  }

  if( renderWeekPattern === 'short' ) {
    return (
      <>
        {WeekDaysShortList.map( day => (
          <FlexBlock
            justify={'center'}
            width={'100%'}
            p={'12px 0px'}
            borderBottom={`1px solid ${defaultColor}`}
          >
            {day}
          </FlexBlock>
        ) )}
      </>
    )
  }

  return <></>
}

const CalendarBody: FC<CalendarBodyProps> = ( {
                                                list,
                                                current,
                                                tasksList,
                                                onAddTask,
                                                onSelectTask,
                                                onChangeCurrent,
                                                renderWeekPattern
                                              } ) => {
  const taskList: TaskStorage = useMemo( () => {
    return !!tasksList?.length ? getTaskStorage( current, tasksList ) : {}
  }, [current, tasksList] )

  return (
    <CalendarDesktopContainer>
      <CalendarBodyTitle
        current={current}
        onChangeCurrent={onChangeCurrent}
        renderWeekPattern={renderWeekPattern}
      />

      <CalendarDateListContainer>
        {/*<WeekList renderWeekPattern={renderWeekPattern}/>*/}
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
                                               initialCurrent,
                                               disabledOptions = {},
                                               renderWeekPattern = 'full'
                                             } ) => {
  const calendar = useCalendar( {
    initialCurrent,
    disabledOptions,
    renderWeekPattern
  } )

  return (
    <FlexBlock position={'relative'}>
      <CalendarBody
        onChangeCurrent={calendar.onChangeCurrent}
        renderWeekPattern={renderWeekPattern}
        current={calendar.current}
        list={calendar.calendarList}
        tasksList={calendar.tasksList}
        onAddTask={calendar.onAddTask}
        onSelectTask={calendar.onSelectTask}
      />
      <AddTaskModal
        date={calendar.addTaskDate}
        onClose={() => calendar.setAddTaskDate( null )}
      />
      <TaskInfoModal
        selectedTask={calendar.selectedTask}
        onClose={() => calendar.setSelectedTask( null )}
      />
    </FlexBlock>
  )
}
