import {FC, memo, useMemo} from 'react'
import {
	CalendarCurrentMonth,
	TaskInformerMainProps,
	TaskInformerProps,
	TaskMemberItemType,
	TaskMembersListType
} from '../types'
import styled, {css} from 'styled-components'
import dayjs from 'dayjs'
import {DATE_HOURS_FORMAT, DATE_RENDER_FORMAT, disabledColor, hoverColor, WeekDaysList} from '../../../common/constants'
import {Female, Male, SadSmile} from '../../Icons/Icons'
import {convertEventStatus} from '../../../common/functions'
import {FlexBlock, FlexBlockProps} from '../../LayoutComponents/FlexBlock'
import {SmallMonthCalendar} from '../DatePicker/SmallMonthCalendar'
import {getMonthDays} from '../../../common/calendarSupport/getters'
import {SmallCalendarMonthTitle} from '../DatePicker/SmallCalendarMonthTitle'
import {Heading} from '../../Text/Heading'
import {JoinToEventButton} from '../../Buttons/Buttons.styled'
import {ArrowIndicator} from '../Cell'
import {EventIcon} from '../../Icons/EventIcon'

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

const TaskMemberItemContainer: FC<FlexBlockProps> = memo( ( props ) => {
  return <FlexBlock
    {...props}
    p={'12px 6px'}
    border={'1px solid black'}
    justify={'start'}
    align={'center'}
    direction={'row'}
    width={'100%'}
    borderRadius={4}
    additionalCss={css`
      &:not(:last-child) {
        margin-bottom: 4px;
      }
    `}
  />
} )

const TaskMemberItemNameContainer = styled( 'div' )`
  & {
    font-size: 16px;
    flex-grow: 1;
    text-align: left;
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
      <FlexBlock justify={'flex-start'} align={'flex-start'} direction={'column'} width={'100%'}>
        {members.map( ( member ) => (
          <TaskMemberItem member={member}/>
        ) )}
      </FlexBlock>
    </TaskMemberListContainer>
  )
}

const TaskMemberItem: FC<{ member: TaskMemberItemType }> = ( { member } ) => {
  return (
    <TaskMemberItemContainer>
      <FlexBlock mr={6} align={'center'}>
        {member.gender === 'woman' ? (
          <Female size={20} color={'#000'}/>
        ) : <Male size={20} color={'#000'}/>}
      </FlexBlock>
      <TaskMemberItemNameContainer>
        {`${member.surname} ${member.name}`}
      </TaskMemberItemNameContainer>
    </TaskMemberItemContainer>
  )
}

const TaskInformerMain: FC<TaskInformerMainProps> = ( { taskItem } ) => {
  const options = useMemo( () => {
    const start = dayjs( taskItem.taskInfo.time )
    const end = dayjs( taskItem.taskInfo.timeEnd )
    const current: CalendarCurrentMonth = {
      layout: 'month',
      month: start.month(),
      year: start.year()
    }
    return {
      current,
      monthItem: getMonthDays( current, { useOtherDays: true } ),
      currentDate: start.toDate(),
      start: `${WeekDaysList[ start.weekday() ]}, ${start.format( DATE_RENDER_FORMAT )}`,
      end: `${start.isSame( end, 'day' ) ? `${end.format( DATE_HOURS_FORMAT )}` : `${`${WeekDaysList[ end.weekday() ]}, ${end.format( DATE_RENDER_FORMAT )}`}`}`
    }
  }, [taskItem.taskInfo.time] )

  return (
    <FlexBlock
      direction={'column'}
      width={'100%'}
      minWidth={900}
      maxWidth={1200}
      p={'12px 20px'}
      gap={20}
    >
      <FlexBlock direction={'row'} width={'100%'} gap={12}>
        <FlexBlock
          flex={'1 0 calc(50% - 6px)'}
          borderRight={`1px solid ${disabledColor}`}
          pr={20}
          direction={'column'}
          gap={12}
        >
          <FlexBlock mb={6}>
            {taskItem.taskInfo.link?.value ? (
              <JoinToEventButton
                href={taskItem.taskInfo.link.value}
                target={'_blank'}
                rel={''}
              >
                Присоединиться
              </JoinToEventButton>
            ) : (
              <span>+</span>
            )}
          </FlexBlock>
          <FlexBlock
            direction={'row'}
            justify={'flex-start'}
            align={'flex-start'}
            width={'100%'}
            gap={8}
          >
            <FlexBlock
              bgColor={hoverColor}
              pl={6}
              pr={6}
              borderRadius={4}
              role={'button'}
              height={28}
              align={'center'}
              justify={'center'}
              additionalCss={css`
                cursor: pointer;
                transition: background-color .3s ease-in;

                &:hover {
                  background-color: ${disabledColor};
                }
              `}
            >
              <ArrowIndicator
                priorityKey={taskItem.taskInfo.priority}
                isCompleted={taskItem.taskInfo.status === 'completed'}
              />
            </FlexBlock>
            <FlexBlock direction={'column'} gap={8} width={'100%'}>
              <FlexBlock width={'100%'} mb={4}>
                <Heading.H2>{taskItem.taskInfo.title}</Heading.H2>
              </FlexBlock>
              <FlexBlock align={'center'} gap={6}>
                <FlexBlock
                  bgColor={hoverColor}
                  pl={6}
                  pr={6}
                  borderRadius={4}
                  role={'button'}
                  height={28}
                  align={'center'}
                  justify={'center'}
                  additionalCss={css`
                    cursor: pointer;
                    transition: background-color .3s ease-in;

                    &:hover {
                      background-color: ${disabledColor};
                    }
                  `}
                >
                  <EventIcon status={taskItem.taskInfo.status} size={20}/>
                </FlexBlock>
                {convertEventStatus( taskItem.taskInfo.status )}
              </FlexBlock>
              <FlexBlock>
                {`${options.start} - ${options.end}`}
              </FlexBlock>
              <FlexBlock>

              </FlexBlock>
            </FlexBlock>
          </FlexBlock>
          <FlexBlock width={'100%'} direction={'column'}>

          </FlexBlock>
        </FlexBlock>
        <FlexBlock
          width={'fit-content'}
          justify={'flex-end'}
          pl={20}
        >
          <SmallMonthCalendar
            title={<SmallCalendarMonthTitle monthItem={options.monthItem}/>}
            currentDate={options.currentDate}
            current={options.current}
            monthItem={options.monthItem}
          />
        </FlexBlock>
      </FlexBlock>
      <FlexBlock>
        Событие создано:
        {dayjs( taskItem.taskInfo.createdAt ).format( `${DATE_RENDER_FORMAT} по местному времени` )}
      </FlexBlock>
    </FlexBlock>
  )
}

const TaskInfoNotFound: FC = () => (
  <FlexBlock
    height={'100%'}
    width={'100%'}
    justify={'center'}
    align={'center'}
    wrap={'wrap'}
    p={'24px 0'}
  >
    <FlexBlock
      width={'100%'}
      justify={'center'}
      align={'center'}
      mb={24}
    >
      <SadSmile color={'darkorange'}/>
    </FlexBlock>
    <FlexBlock
      width={'100%'}
      justify={'center'}
    >
      К сожалению, не удалось загрузить информацию по данному заданию.
    </FlexBlock>
  </FlexBlock>
)

export const TaskInformer: FC<TaskInformerProps> = ( { taskItem } ) => {
  return !taskItem ? <TaskInfoNotFound/> : <TaskInformerMain taskItem={taskItem}/>
}
