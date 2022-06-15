import React, { FC, useCallback } from 'react'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import {
  CalendarCurrentDay,
  CalendarItem,
  CalendarTaskItem,
  CalendarTaskList, GlobalTaskListProps,
  OnSelectTaskFnType
} from '../types'
import { TaskTilePriorityIndicator } from '../Cell'
import dayjs from 'dayjs'
import {
  currentColor,
  DATE_HOURS_FORMAT,
  defaultColor,
  disabledColor, hoverColor
} from '../../../common/constants'
import styled, { css } from 'styled-components'
import { NotFoundIcon } from '../../Icons/Icons'
import { Button } from '../../Buttons/Buttons.styled'
import { StyledFindInput } from '../../Input/Input.styled'

interface DayTaskListProps extends GlobalTaskListProps {
  day: CalendarItem
  current: CalendarCurrentDay,
  taskList: CalendarTaskList,
  onSelectTask?: OnSelectTaskFnType,
}

export interface NotFoundTaskProps extends Omit<GlobalTaskListProps, 'renderTaskCount'> {
  day: CalendarItem
}

interface DayTaskItemProps {
  taskInfo: CalendarTaskItem,
  tabIndex: number
  onSelectTask?: OnSelectTaskFnType,
  day: CalendarItem
}

const TileMixin = css`
  & {
    cursor: pointer;
    box-shadow: none;
    transition: box-shadow .3s ease-in-out;
  }

  &:hover {
    box-shadow: 0px 0px 4px ${defaultColor};
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`

const NotFoundTitle = styled( 'h2' )`
  & {
    font-size: 24px;
    color: ${defaultColor};
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-bottom: 24px;
  }
`

export const NotFoundTask: FC<NotFoundTaskProps> = ( { onAddTask, day } ) => {
  return (
    <FlexBlock
      height={400}
      minWidth={300}
      maxWidth={'100%'}
      direction={'column'}
      align={'center'}
      justify={'flex-start'}
    >
      <FlexBlock mb={12}>
        <NotFoundIcon/>
      </FlexBlock>
      <NotFoundTitle>Событий, назначенных на текущую дату,<br/> не найдено</NotFoundTitle>
      <Button
        onClick={() => onAddTask && day && onAddTask( day )}
      >
        Добавить событие
      </Button>
    </FlexBlock>
  )
}

export const DayTaskList: FC<DayTaskListProps> = ( {
                                                     current,
                                                     taskList,
                                                     onSelectTask,
                                                     day,
                                                     onAddTask
                                                   } ) => {

  return (
    <FlexBlock
      direction={'column'}
      width={'100%'}
      height={'100%'}
      grow={10}
      minHeight={650}
      maxHeight={800}
      pr={8}
    >
      {!!taskList.length
        ? (
          <>
            <FlexBlock
              pb={24}
              ml={-8}
              pl={8}
              mr={-8}
              pr={8}
              justify={'flex-start'}
              wrap={'nowrap'}
              bgColor={'#fff'}
              width={'calc(100% + 16px)'}
              additionalCss={css`gap: 12px;
                top: 0;
                left: 0;
                z-index: 1
              `}
              position={'sticky'}
            >
              <StyledFindInput placeholder={'Название события'}/>
              <StyledFindInput placeholder={'Начало события'}/>
              <StyledFindInput placeholder={'Конец события'}/>
              <StyledFindInput placeholder={'Статус'}/>

            </FlexBlock>

            {taskList.map( ( task, index ) => (
              <DayTaskItem
                key={task.createdAt.toString() + index}
                taskInfo={task}
                day={day}
                tabIndex={index + 1}
                onSelectTask={onSelectTask}
              /> ) )}
          </>
        )
        : (
          <NotFoundTask onAddTask={onAddTask} day={day}/>
        )}
    </FlexBlock>
  )
}

export const DayTaskItem: FC<DayTaskItemProps> = ( { taskInfo, tabIndex, onSelectTask, day } ) => {
  const start = dayjs( taskInfo.time ).format( DATE_HOURS_FORMAT )
  const end = dayjs( taskInfo.timeEnd ).format( DATE_HOURS_FORMAT )

  const setTaskInfo = useCallback( () => {
    if( onSelectTask ) {
      onSelectTask( {
        date: day,
        taskInfo
      } )
    }
  }, [onSelectTask, taskInfo, day] )

  const keyPressHandler = ( e: React.KeyboardEvent<HTMLDivElement> ) => {
    if( e.key === 'Enter' ) {
      setTaskInfo()
    }
  }

  const clickHandler = ( e: React.MouseEvent<HTMLDivElement> ) => {
    setTaskInfo()
  }

  return (
    <FlexBlock
      direction={'row'}
      align={'center'}
      wrap={'nowrap'}
      width={'100%'}
      borderRadius={4}
      role={'button'}
      tabIndex={tabIndex}
      bgColor={hoverColor}
      onKeyPress={keyPressHandler}
      onClick={clickHandler}
      additionalCss={css`
        ${TileMixin};
      `}
      p={'8px 12px'}
    >
      <FlexBlock shrink={0}>
        <TaskTilePriorityIndicator
          priority={taskInfo.priority}
          isCompleted={taskInfo.status === 'completed'}
        />
      </FlexBlock>
      <FlexBlock shrink={0} minWidth={170} pl={8} mr={16}>
        <span>
          {start}
        </span>
        -
        <span>
          {end}
        </span>
        <span style={{ paddingLeft: 6, color: defaultColor }}>
          {` UTC+${dayjs().utcOffset() / 60}`}
        </span>
      </FlexBlock>
      <FlexBlock grow={10} justify={'flex-start'}>
        {taskInfo.title}
      </FlexBlock>
    </FlexBlock>
  )
}
