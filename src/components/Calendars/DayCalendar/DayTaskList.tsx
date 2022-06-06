import React, { FC, useCallback } from 'react'
import { FlexBlock } from '../../LayoutComponents/flexBlock'
import {
  CalendarCurrentDay,
  CalendarItem,
  CalendarTaskItem,
  CalendarTaskList,
  OnSelectTaskFnType
} from '../types'
import { TaskTilePriorityIndicator } from '../cell'
import dayjs from 'dayjs'
import { DATE_HOURS_FORMAT, defaultColor, disabledColor } from '../../../common/constants'
import { css } from 'styled-components'

interface DayTaskListProps {
  day: CalendarItem
  current: CalendarCurrentDay,
  taskList: CalendarTaskList,
  onSelectTask?: OnSelectTaskFnType
}

interface DayTaskItemProps {
  taskInfo: CalendarTaskItem,
  tabIndex: number
  onSelectTask?: OnSelectTaskFnType,
  day: CalendarItem
}

export const DayTaskList: FC<DayTaskListProps> = ( { current, taskList, onSelectTask, day } ) => {

  return (
    <FlexBlock direction={'column'} width={'100%'} height={'100%'} grow={10}>
      {!!taskList.length ? (
        <>
          {taskList.map( ( task, index ) => (
            <DayTaskItem
              key={task.createdAt.toString() + index}
              taskInfo={task}
              day={day}
              tabIndex={index + 1}
              onSelectTask={onSelectTask}
            />
          ) )}
        </>
      ) : (
        <>
          <FlexBlock>
            На этот день, заданий не запланировано.
          </FlexBlock>
        </>
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
      bgColor={disabledColor}
      onKeyPress={keyPressHandler}
      onClick={clickHandler}
      additionalCss={css`
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
      `}
      p={'6px 12px'}
    >
      <FlexBlock shrink={0}>
        <TaskTilePriorityIndicator
          priority={taskInfo.priority}
          isCompleted={!!taskInfo.isCompleted}
        />
      </FlexBlock>
      <FlexBlock flex={'1 0 15%'} shrink={0} minWidth={170} pl={8} mr={16}>
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
