import styled, { css, keyframes } from 'styled-components'
import React, { FC, useMemo, useState } from 'react'
import {
  CalendarCellProps,
  CalendarPriorityKeys,
  CalendarTaskItem,
  TaskTileItemProps,
  TaskTileListProps,
  TaskTilePriorityIndicatorProps
} from './types'
import { addNull } from '../../common/functions'
import {
  currentColor,
  defaultColor, defaultTasksList,
  disabledColor,
  hoverColor,
  priorityColors
} from '../../common/constants'
import dayjs from 'dayjs'

interface CellComponentProps {
  disabled?: boolean,
  isCurrent?: boolean,
  isHover?: boolean
}

const CalendarDateContainer = styled( 'div' )`
  & {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    padding: 12px;
    transition: all .3s ease-in-out;
  }
`

const CalendarDate = styled( 'span' )<CellComponentProps>`
  & {
    display: flex;
    flex: 1 0 50%;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    color: ${props => props.disabled ? disabledColor : defaultColor};
    transition: all .3s ease-in;
  }

  ${props => {
    if( props.isHover ) {
      return css`
        & {
          color: black;
        }
      `
    }
  }}
`

const CellContainer = styled( 'div' )<CellComponentProps>`
  & {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 4px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 4px;
    box-shadow: none;
    border: 1px solid ${defaultColor};
    transition: all .3s ease-in;
    opacity: .2;
  }

  ${( { isCurrent, disabled } ) => {
    if( isCurrent ) {
      return css`
        & {
          border: 1px solid ${currentColor};
          opacity: 1;
        }

        ${!disabled && css`
          &:hover {
            cursor: pointer;
            box-shadow: 0 0 8px 4px ${disabledColor};
          }
        `}
      `
    }
  }}

  ${( { disabled } ) => {
    if( disabled ) {
      return css`
        & {
          border: 1px solid ${disabledColor};
        }
      `
    }

    return css``
  }}

`

const addTaskAnimation = keyframes( {
  from: {
    background: '#fff'
  },
  to: {
    background: currentColor
  }
} )

const AddTask = styled( 'div' )`
  & {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 32px;
    display: flex;
    line-height: 1;
    justify-content: center;
    z-index: 1;
    align-items: center;
    color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    animation: .3s ease-in-out ${addTaskAnimation} forwards;
  }
`

const TaskTile = styled( 'div' )<CellComponentProps & { withFill?: boolean }>`
  & {
    background-color: ${props => props.withFill ? hoverColor : ''};
    width: 100%;
    padding: 3px 6px;
    text-align: center;
    border-radius: 4px;
    margin-top: 4px;
    opacity: ${props => props.disabled ? .2 : 1};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
  }
`

export const TaskTileText = styled( 'span' )<{ isCompleted?: boolean, maxWidth?: string, fs?: string }>`
  & {
    display: block;
    font-size: ${props => props.fs || '12px'};
    line-height: 1;
    width: 100%;
    max-width: ${props => props.maxWidth || '70%'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
  }
`

const TaskTimeValue = styled( 'span' )`
  & {
    font-size: 12px;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
    display: block;
  }
`

const TaskTileContainer = styled( 'div' )`
  & {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 130px;
    overflow: scroll;
    scroll-behavior: unset;
    transition: all .3s ease;
  }
`

const Indicator = styled( 'span' )<{ color: string }>`
  & {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${props => props.color || defaultColor};
    box-shadow: 0px 0px 2px 2px ${props => props.color || defaultColor};
    margin-right: 8px;
  }
`


export const CalendarCell: FC<CalendarCellProps> = ( {
                                                       value,
                                                       tasks = [],
                                                       onAddTask,
                                                       renderTaskCount,
                                                       onSelectTask
                                                     } ) => {
  const [isHover, setIsHover] = useState( false )

  return (
    <CellContainer
      disabled={value.meta.isDisabled}
      isCurrent={value.meta.isCurrent}
    >
      <CalendarDateContainer
        onMouseEnter={() => value.meta.isCurrent && !value.meta.isDisabled && setIsHover( true )}
        onMouseLeave={() => setIsHover( false )}
      >
        {isHover && (
          <AddTask onClick={() => onAddTask && onAddTask( value )}>&#x0002B;</AddTask>
        )}
        <CalendarDate
          disabled={value.meta.isDisabled}
          isCurrent={value.meta.isCurrent}
        >
          {!isHover && addNull( dayjs( value.value ).date() )}
        </CalendarDate>
      </CalendarDateContainer>
      <TaskTileList
        tasks={tasks}
        date={value}
        onSelect={onSelectTask}
      />
    </CellContainer>
  )
}

export const TaskTileList: FC<TaskTileListProps> = ( { tasks = [], date, onSelect } ) => {

  if( !!tasks?.length ) {
    return (
      <TaskTileContainer>
        {tasks.map( ( item, index ) => (
          <TaskTileItem
            key={item.title + index}
            taskInfo={item}
            date={date}
            onSelect={onSelect}
          />
        ) )}
      </TaskTileContainer>
    )
  }

  return <></>
}

export const TaskTilePriorityIndicator: FC<TaskTilePriorityIndicatorProps> = ( {
                                                                                 priority,
                                                                                 isCompleted
                                                                               } ) => {
  if( isCompleted ) {
    return <Indicator color={'#9fd962'}/>
  }
  return (
    <Indicator color={priorityColors[ priority ]}/>
  )
}

export const TaskTileItem: FC<TaskTileItemProps> = ( { taskInfo, onSelect, date } ) => {
  const [isHover, setIsHover] = useState( false )

  const condition = useMemo( () => {
    return date.meta.isCurrent && !date.meta.isDisabled
  }, [date, taskInfo] )

  return (
    <TaskTile
      onMouseEnter={() => condition && setIsHover( true )}
      onMouseLeave={() => setIsHover( false )}
      withFill={isHover}
      disabled={date.meta.isDisabled}
      isCurrent={date.meta.isCurrent}
      onClick={( event ) => condition && onSelect && onSelect( { date, taskInfo, event } )}
    >
      <TaskTilePriorityIndicator priority={taskInfo.priority} isCompleted={!!taskInfo.isCompleted}/>
      <TaskTileText isCompleted={!!taskInfo.isCompleted}>
        {taskInfo.title}
      </TaskTileText>
      <TaskTimeValue>
        {addNull( dayjs( taskInfo.time ).hour() )}:{addNull( dayjs( taskInfo.time ).minute() )}
      </TaskTimeValue>
    </TaskTile>
  )
}
