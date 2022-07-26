import React, { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import {
  CalendarCurrentDay,
  CalendarItem, CalendarPriorityKeys,
  CalendarTaskItem,
  CalendarTaskList, EventItem, GlobalTaskListProps,
  OnSelectTaskFnType
} from '../types'
import { ArrowIndicator, TaskTilePriorityIndicator } from '../Cell'
import dayjs from 'dayjs'
import {
  currentColor,
  DATE_HOURS_FORMAT, DATE_RENDER_FORMAT,
  defaultColor,
  disabledColor, hoverColor
} from '../../../common/constants'
import styled, { css } from 'styled-components'
import { NotFoundIcon } from '../../Icons/Icons'
import { Button, JoinToEventButton } from '../../Buttons/Buttons.styled'
import { StyledFindInput } from '../../Input/Input.styled'
import { TextInput } from '../../Input/TextInput'
import { SelectPriorityInput } from '../../Input/SelectInput/CalendarSelectInputs/SelectPriorityInput'
import { useFormik } from 'formik'
import { EventFilter } from './EventFilter'

interface DayTaskListProps extends GlobalTaskListProps {
  day: CalendarItem
  current: CalendarCurrentDay,
  taskList: Array<EventItem>,
  onSelectTask?: OnSelectTaskFnType,
}

export interface NotFoundTaskProps extends Omit<GlobalTaskListProps, 'renderTaskCount'> {
  day: CalendarItem,
  text?: ReactNode
}

interface DayTaskItemProps {
  taskInfo: EventItem,
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

export const NotFoundTask: FC<NotFoundTaskProps> = ( { onAddTask, day, text } ) => {
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
      <NotFoundTitle>
        {text || <>Событий, назначенных на текущую дату,<br/> не найдено</>}
      </NotFoundTitle>
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
  const filters = useFormik<{ title: string | null, priority: null | CalendarPriorityKeys, start: null | Date, end: null | Date }>( {
    initialValues: {
      title: null,
      priority: null,
      start: null,
      end: null
    },
    onSubmit: () => {
    }
  } )
  const [list, setList] = useState( taskList )

  useEffect( () => {
    filters.resetForm( {
      values: {
        title: null,
        priority: null,
        start: null,
        end: null
      }
    } )
  }, [day] )

  return (
    <FlexBlock
      direction={'column'}
      width={'100%'}
      height={'100%'}
      grow={10}
      minHeight={650}
      maxHeight={800}
      pt={4}
      pr={8}
    >
      {!taskList.length ? (
        <NotFoundTask onAddTask={onAddTask} day={day}/>
      ) : (
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
            <EventFilter
              currentDay={current.date}
              listForFilter={taskList}
              onChange={( list ) => setList( list )}
            />

          </FlexBlock>
          {!!list.length ? (
            <>
              {list.map( ( task, index ) => (
                <DayTaskItem
                  key={task.createdAt.toString() + index}
                  taskInfo={task}
                  day={day}
                  tabIndex={index + 1}
                  onSelectTask={onSelectTask}
                /> ) )
              }
            </>
          ) : (
            <NotFoundTask
              onAddTask={onAddTask}
              day={day}
              text={<>
                Событий по указанным фильтрам<br/>не найдено!
              </>}
            />
          )}
        </>
      )}
    </FlexBlock>
  )
}

export const DayTaskItem: FC<DayTaskItemProps> = ( { taskInfo, tabIndex, onSelectTask, day } ) => {
  const start = dayjs( taskInfo.time ).format( 'DD-MM HH:mm' )
  const end = dayjs( taskInfo.timeEnd ).format( 'DD-MM HH:mm' )

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
        <ArrowIndicator
          priorityKey={taskInfo.priority}
          isCompleted={taskInfo.status === 'completed'}
        />
      </FlexBlock>
      <FlexBlock direction={'row'} width={'100%'}>
        <FlexBlock direction={'column'} shrink={0} minWidth={130} pl={8} mr={16} gap={4}>
          <FlexBlock>
            <span style={{ color: defaultColor }}>с {start}</span>
          </FlexBlock>
          <FlexBlock>
            <span style={{ color: defaultColor }}>до {end}</span>
          </FlexBlock>
        </FlexBlock>
        <FlexBlock
          grow={10}
          gap={6}
          justify={'flex-start'}
          align={'flex-start'}
          direction={'row'}
          width={'100%'}
        >
          <FlexBlock width={'100%'}>
            {taskInfo.title}
          </FlexBlock>
          {taskInfo.link?.value && (
            <FlexBlock>
              <JoinToEventButton
                href={taskInfo.link.value}
                target={'_blank'}
                rel={''}
                onClick={( e ) => e.stopPropagation()}
              >
                Подключиться
              </JoinToEventButton>
            </FlexBlock>
          )}
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  )
}
