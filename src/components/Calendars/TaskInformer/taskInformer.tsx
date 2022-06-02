import { FC, ReactNode } from 'react'
import {
  GenderKeys,
  SelectTaskItem,
  TaskInformerMainProps,
  TaskInformerProps, TaskMemberItemType,
  TaskMembersListType
} from '../types'
import styled, { css, CSSProperties } from 'styled-components'
import dayjs from 'dayjs'
import { currentColor, DATE_RENDER_FORMAT, defaultColor } from '../../../common/constants'
import { Female, Male } from '../../Icons/icons'
import { checkTaskStatus } from '../../../common/functions'
import { FlexBlock } from '../../LayoutComponents/flexBlock'

const FlexColumn = styled( 'div' )`
  & {
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`

const FlexRowStart = styled( 'div' )`
  & {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
`

const TaskInfoTextContainer = styled( FlexRowStart )<{ isSticky?: boolean }>`
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  ${( props ) => {
    if( props.isSticky ) {
      return css`
        & {
          z-index: 1;
          background-color: #fff;
          padding: 8px 0;
          position: sticky;
          top: 0;
          left: 0
        }
      `
    }
  }}
`

const TaskInfoTitle = styled( 'span' )`
  & {
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    margin-right: 6px;
  }
`

const TaskInfoValue = styled( 'span' )`
  & {
    display: block;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
  }
`

const TaskMemberListContainer = styled( FlexColumn )`
  & {
    align-items: flex-start;
    justify-content: flex-start;
    max-height: 70vh;
    overflow: scroll;
  }
`

const TaskMemberItemContainer = styled( 'div' )`
  & {
    padding: 12px 6px;
    border: 1px solid black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: 100%
  }

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`

const TaskMemberItemIconContainer = styled( 'div' )`
  & {
    margin-right: 6px;
    display: flex;
    align-items: center;
  }
`

const TaskMemberItemNameContainer = styled( 'div' )`
  & {
    font-size: 16px;
    flex-grow: 1;
    text-align: left;
  }
`

const TaskInformerMainContainer = styled( FlexRowStart )`
  & {
    width: fit-content;
  }
`

const TaskInformerDataList = styled( FlexRowStart )`
  & {
    flex-direction: column;
    flex: 1 0 calc(50% - 16px);
    min-width: 300px;
    max-width: 600px;
  }

  &:not(:last-child) {
    margin-right: 32px;
  }
`

const TaskInformerNotFoundContainer = styled( 'div' )`
  & {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`

const TaskInfoText: FC<{ title: string, value: string, isSticky?: boolean }> = ( {
                                                                                   title,
                                                                                   value,
                                                                                   isSticky
                                                                                 } ) => {

  return (
    <TaskInfoTextContainer isSticky={isSticky}>
      <TaskInfoTitle>
        {title}
      </TaskInfoTitle>
      <TaskInfoValue>
        {value}
      </TaskInfoValue>
    </TaskInfoTextContainer>
  )
}


const TaskMemberList: FC<{ members: TaskMembersListType }> = ( { members } ) => {
  return (
    <TaskMemberListContainer>
      <TaskInfoText
        isSticky={true}
        title={'Участники:'}
        value={members.length.toString()}
      />
      <FlexColumn>
        {members.map( ( member ) => (
          <TaskMemberItem member={member}/>
        ) )}
      </FlexColumn>
    </TaskMemberListContainer>
  )
}

const TaskMemberItem: FC<{ member: TaskMemberItemType }> = ( { member } ) => {
  return (
    <TaskMemberItemContainer>
      <TaskMemberItemIconContainer>
        {member.gender === 'woman' ? (
          <Female size={20} color={'#000'}/>
        ) : <Male size={20} color={'#000'}/>}
      </TaskMemberItemIconContainer>
      <TaskMemberItemNameContainer>
        {`${member.surname} ${member.name}`}
      </TaskMemberItemNameContainer>
    </TaskMemberItemContainer>
  )
}

const TaskInformerMain: FC<TaskInformerMainProps> = ( { taskItem } ) => {
  return (
    <TaskInformerMainContainer>
      <TaskInformerDataList>
        <TaskInfoText
          title={'Создано:'}
          value={dayjs( taskItem.taskInfo.createdAt ).format( DATE_RENDER_FORMAT )}
        />
        <TaskInfoText
          title={'Дата завершения:'}
          value={dayjs( taskItem.taskInfo.time ).format( DATE_RENDER_FORMAT )}
        />
        <TaskInfoText
          title={'Статус:'}
          value={checkTaskStatus( taskItem )}
        />
        <TaskInfoText
          title={'Описание:'}
          value={taskItem.taskInfo.description || 'Не указано'}
        />
      </TaskInformerDataList>

      <TaskInformerDataList>
        <TaskMemberList members={taskItem.taskInfo.members}/>
      </TaskInformerDataList>
    </TaskInformerMainContainer>
  )
}

export const TaskInformer: FC<TaskInformerProps> = ( { taskItem } ) => {
  if( !taskItem ) {
    return (
      <FlexBlock height={'100%'} justify={'center'} align={'center'}>
        Не удалось загрузить информацию по заданию.
      </FlexBlock>
    )
  }

  return <TaskInformerMain taskItem={taskItem}/>
}
