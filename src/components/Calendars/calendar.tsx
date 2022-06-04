import {
  AddTaskModalProps,
  MonthCalendarProps,
  CalendarBodyTitleProps, CalendarList,
  CalendarProps,
  TaskInfoModalProps,
  TaskStorage,
  WeekListProps, CalendarMode, WeekItem, DayCalendarProps, CalendarItem
} from './types'
import { FC, useCallback, useEffect, useMemo } from 'react'
import {
  CalendarDateListContainer,
  CalendarDesktopContainer,
  CalendarTitle, SwitchCalendarMode
} from './calendar.styled'
import { CalendarCell, TaskTileText } from './cell'
import {
  DATE_RENDER_FORMAT,
  defaultColor, disabledColor,
  MonthList,
  WeekDaysList,
  WeekDaysShortList
} from '../../common/constants'
import dayjs from 'dayjs'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../Modal/modal'
import { TaskInformer } from './TaskInformer/taskInformer'
import { StyledButton } from '../Buttons/buttons.styled'
import { FlexBlock } from '../LayoutComponents/flexBlock'
import {
  changeDayCurrentHandler,
  changeMonthCurrentHandler,
  changeWeekCurrentHandler,
  getTaskListOfDay,
  getTaskStorage
} from '../../common/functions'
import { Arrow, DoubleArrow } from '../Icons/icons'
import { HoverElementMixin } from '../../common/cssMixins'
import {
  ChangeCurrentPattern,
  ChangeMonthCurrentPattern,
  ShortChangeCurrentPattern
} from '../../common/commonTypes'
import { useCalendar } from '../hooks/useCalendar'
import styled from 'styled-components'
import { packageDate } from '../../common/dayjs'

const CalendarBodyTitle: FC<CalendarBodyTitleProps> = ( {
                                                          current,
                                                          onChangeCurrent,
                                                          renderWeekPattern
                                                        } ) => {
  const title: string = useMemo( () => {
    switch (current.layout) {
      case 'month':
        return `${MonthList[ current.month ]} ${current.year}г.`
      case 'week':
        return `Неделя ${current.week}, ${MonthList[ dayjs().set( 'year', current.year ).week( current.week ).month() ]} ${current.year}г.`
      case 'day':
        const day = dayjs( current.date )
        return `${WeekDaysList[ day.weekday() ]}, ${day.format( 'DD-MM-YYYY' )}г.`
    }
    return `Еще не учтено: ${current.layout}`
  }, [current] )

  const onChangeCurrentHandler = useCallback( ( pattern: ShortChangeCurrentPattern = 'today' ) => {
    if( onChangeCurrent ) {
      switch (current.layout) {
        case 'month':
          return onChangeCurrent( changeMonthCurrentHandler( current, pattern ), current.layout )
        case 'week':
          return onChangeCurrent( changeWeekCurrentHandler( current, pattern ), current.layout )
        case 'day':
          return onChangeCurrent( changeDayCurrentHandler( current, pattern ), current.layout )
      }
    }
  }, [current] )

  const onChangeCurrentLayoutHandler = useCallback( ( newLayout: CalendarMode['layout'] ) => {
    if( onChangeCurrent ) {
      return onChangeCurrent( dayjs().toDate(), newLayout )
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
        <FlexBlock flex={'1 0 33.3%'} justify={'flex-start'} align={'center'}>
          <CalendarTitle>
            {title}
          </CalendarTitle>
        </FlexBlock>
        <FlexBlock flex={'1 0 33.3%'} justify={'center'} align={'center'}>
          <SwitchCalendarMode
            isSelected={current.layout === 'day'}
            onClick={() => onChangeCurrentLayoutHandler( 'day' )}
          >
            День
          </SwitchCalendarMode>
          <SwitchCalendarMode
            onClick={() => onChangeCurrentLayoutHandler( 'week' )}
            isSelected={current.layout === 'week'}
          >
            Неделя
          </SwitchCalendarMode>
          <SwitchCalendarMode
            onClick={() => onChangeCurrentLayoutHandler( 'month' )}
            isSelected={current.layout === 'month'}
          >
            Месяц
          </SwitchCalendarMode>
          <SwitchCalendarMode isSelected={current.layout === 'year'}>
            Год
          </SwitchCalendarMode>
        </FlexBlock>
        <FlexBlock flex={'1 0 33.3%'} justify={'flex-end'} align={'center'}>
          <DoubleArrow
            onClick={() => onChangeCurrentHandler( '--' )}
            size={20}
            transform={'rotate(180deg)'}
            mr={6}
          />
          <Arrow
            onClick={() => onChangeCurrentHandler( '-' )}
            size={20}
            transform={'rotate(180deg)'}
            mr={6}
          />
          <SwitchCalendarMode
            onClick={() => onChangeCurrentHandler( 'today' )}
          >
            Сегодня
          </SwitchCalendarMode>
          <Arrow
            mr={6}
            size={20}
            onClick={() => onChangeCurrentHandler( '+' )}
          />
          <DoubleArrow
            size={20}
            onClick={() => onChangeCurrentHandler( '++' )}
          />
        </FlexBlock>
      </FlexBlock>
      <WeekList renderWeekPattern={renderWeekPattern} current={current}/>
    </FlexBlock>
  )
}

const WeekList: FC<WeekListProps> = ( { renderWeekPattern, current } ) => {
  if( current.layout === 'week' || current.layout === 'month' ) {
    if( renderWeekPattern === 'full' ) {
      return (
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
        </CalendarDateListContainer>
      )
    }

    if( renderWeekPattern === 'short' ) {
      return (
        <CalendarDateListContainer>
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
        </CalendarDateListContainer>
      )
    }

    return <></>
  }
  return <></>
}

const WeekContainer = styled( 'div' )`
  position: relative;
  grid-column-start: 1;
  grid-column-end: 8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const DaysContainer = styled( 'div' )`
  display: grid;
  grid-template-columns: repeat(7, minmax(220px, 1fr));
  grid-column-gap: 4px;
  width: 100%;
`

const WeekOfYearTitle = styled( 'h3' )`
  & {
    font-size: 20px;
    width: 100%;
    text-align: left;
    margin-bottom: 8px;
    margin-top: 0;
    padding-left: 8px;
    color: ${disabledColor};
    background-color: #fff;
    z-index: 9;
    position: sticky;
    top: 0;
    left: 0;
    border-radius: 4px;
    cursor: pointer;
    transition: all .3s ease-in-out;
  }

  &:hover {
    background-color: ${disabledColor};
    color: ${defaultColor};
  }
`

const DayCalendar: FC<DayCalendarProps> = ( {
                                              current,
                                              onChangeCurrent,
                                              renderWeekPattern,
                                              taskStorage,
                                              onSelectTask,
                                              onAddTask,
                                              renderTaskCount
                                            } ) => {
  const day: CalendarItem = useMemo( () => {
    return packageDate( current.date, current )
  }, [current.date] )

  return (
    <FlexBlock justify={'flex-start'} align={'stretch'} wrap={'nowrap'} width={'100%'}>
      <FlexBlock flex={'1 0 60%'}>
        <CalendarCell
          value={day}
          renderTaskCount={renderTaskCount}
          tasks={taskStorage ? getTaskListOfDay( day, taskStorage ) : []}
        />
      </FlexBlock>
      <FlexBlock flex={'1 0 40%'}>
        А тут настройки
      </FlexBlock>
    </FlexBlock>
  )
}

const MonthCalendar: FC<MonthCalendarProps> = ( {
                                                  list,
                                                  current,
                                                  onAddTask,
                                                  onSelectTask,
                                                  onChangeCurrent,
                                                  renderTaskCount,
                                                  taskStorage
                                                } ) => {

  const onSelectWeek = ( item: WeekItem ) => {
    if( current.layout === 'month' && onChangeCurrent ) {
      onChangeCurrent( dayjs().set( 'year', current.year ).week( item.weekOfYear ).toDate(), 'week' )
    }
  }

  return (
    <CalendarDesktopContainer>
      <CalendarDateListContainer>
        {list.map( item => (
          <WeekContainer>
            {current.layout === 'month' && (
              <WeekOfYearTitle
                onClick={() => onSelectWeek( item )}
              >
                {item.weekOfYear}
              </WeekOfYearTitle>
            )}
            <DaysContainer>
              {item.days.map( day => (
                <CalendarCell
                  renderTaskCount={renderTaskCount}
                  key={day.value.toString()}
                  onAddTask={onAddTask}
                  value={day}
                  tasks={taskStorage ? getTaskListOfDay( day, taskStorage ) : []}
                  onSelectTask={onSelectTask}
                />
              ) )}
            </DaysContainer>
          </WeekContainer>
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

  const taskStorage: TaskStorage = useMemo( () => {
    return getTaskStorage( calendar.tasksList )
  }, [calendar.tasksList] )


  return (
    <FlexBlock position={'relative'} align={'flex-start'} direction={'column'}>
      <CalendarBodyTitle
        current={calendar.current}
        onChangeCurrent={calendar.onChangeCurrent}
        renderWeekPattern={renderWeekPattern}
      />
      {calendar.current.layout === 'month' ? (
        <>
          <MonthCalendar
            onChangeCurrent={calendar.onChangeCurrent}
            renderWeekPattern={renderWeekPattern}
            renderTaskCount={5}
            current={calendar.current}
            list={calendar.calendarList}
            taskStorage={taskStorage}
            onAddTask={calendar.onAddTask}
            onSelectTask={calendar.onSelectTask}
          />
        </>
      ) : calendar.current.layout === 'week' ? (
        <>
          <MonthCalendar
            onChangeCurrent={calendar.onChangeCurrent}
            renderWeekPattern={renderWeekPattern}
            current={calendar.current}
            list={calendar.calendarList}
            renderTaskCount={'all'}
            taskStorage={taskStorage}
            onAddTask={calendar.onAddTask}
            onSelectTask={calendar.onSelectTask}
          />
        </>
      ) : calendar.current.layout === 'day' ? (
        <DayCalendar
          current={calendar.current}
          taskStorage={taskStorage}
          renderTaskCount={'all'}
        />
      ) : <></>}
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
