import styled, {css, keyframes} from 'styled-components'
import React, {FC, useMemo, useRef, useState} from 'react'
import {
	CalendarCellProps,
	CalendarPriorityKeys,
	CalendarTaskItem,
	CalendarTaskList,
	TaskTileItemProps,
	TaskTileListProps,
	TaskTilePriorityIndicatorProps
} from './types'
import {addNull} from '../../common/functions'
import {currentColor, defaultColor, disabledColor, hoverColor, priorityColors} from '../../common/constants'
import dayjs from 'dayjs'
import {FlexBlock, FlexBlockProps} from '../LayoutComponents/FlexBlock'
import {Arrow, BurgerIcon, CompleteIcon, DoubleArrow, IconProps, SadSmile} from '../Icons/Icons'

interface CellComponentProps {
	disabled?: boolean,
	isCurrent?: boolean,
	isHover?: boolean
	isToday?: boolean
}

export const CalendarDate = styled('span')<CellComponentProps>`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 4px;
    background-color: ${props => props.isToday ? 'rgba(255,117,66, 1)' : ''};
    color: ${props => props.disabled ? disabledColor : props.isToday ? '#fff' : defaultColor};
    transition: all .3s ease-in;
  }

  ${props => {
    if (props.isHover) {
      return css`
        & {
          color: black;
        }
      `
    }
  }}
`

export const CellContainer = styled('div')<CellComponentProps>`
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
    //transition: all .3s ease-in;
    //opacity: .2;
    transition: all .3s ease-in-out;
  }

  ${({isCurrent, disabled}) => {
    return css`
      ${isCurrent && css`
        & {
          border: 1px solid ${currentColor};
          opacity: 1;
        }
      `}

      ${!disabled && css`
        &:hover {
          cursor: pointer;
          box-shadow: 0 0 8px 4px ${disabledColor};
        }
      `}
    `
  }}

  ${({disabled}) => {
    if (disabled) {
      return css`
        & {
          border: 1px solid ${disabledColor};
        }
      `
    }

    return css``
  }}

`

const addTaskAnimation = keyframes({
	from: {
		background: '#fff'
	},
	to: {
		background: currentColor
	}
})

const AddTask = styled('div')`
  & {
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

const TaskTile = styled('div')<CellComponentProps & { withFill?: boolean }>`
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
    cursor: pointer;
  }
`

export const TaskTileText = styled('span')<{ isCompleted?: boolean, maxWidth?: string, fs?: string }>`
  & {
    display: block;
    font-size: ${props => props.fs || '12px'};
    line-height: 1;
    width: 100%;
    flex: 1 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
  }
`

const TaskTimeValue = styled('span')`
  & {
    font-size: 12px;
    line-height: 1;
    display: flex;
    flex: 1 0 auto;
    flex-grow: 1;
    justify-content: flex-end;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
`

const TaskTileContainer = styled('div')`
  & {
    display: flex;
    flex-direction: column;
    width: 100%;
    //max-height: 30vh;
    overflow: scroll;
    scroll-behavior: unset;
    transition: all .3s ease;
  }
`

const Indicator = styled('span')<{ color: string }>`
  & {
    display: block;
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.color || defaultColor};
    margin-right: 6px;
  }
`

export const ArrowIndicator: FC<{ priorityKey: CalendarPriorityKeys, isCompleted?: boolean } & IconProps & FlexBlockProps> = ({
																																																																priorityKey,
																																																																isCompleted,
																																																																...props
																																																															}) => {
	
	if (isCompleted) {
		return <CompleteIcon size={20} {...props}/>
	}
	
	switch (priorityKey) {
		case 'veryHigh':
			return <DoubleArrow size={20} color={priorityColors.veryHigh} {...props} transform={'rotate(-90deg)'}/>
		case 'high':
			return <Arrow size={20} color={priorityColors.high}  {...props} transform={'rotate(-90deg)'}/>
		case 'medium':
			return <BurgerIcon size={20} {...props}/>
		case 'low':
			return <Arrow size={20} color={priorityColors.low}  {...props} transform={'rotate(90deg)'}/>
		case 'veryLow':
			return <DoubleArrow size={20} color={priorityColors.veryLow}  {...props} transform={'rotate(90deg)'}/>
		case 'not_selected':
			return <SadSmile size={20} color={currentColor} {...props}/>
	}
	
	return <></>
}


export const CalendarCell: FC<CalendarCellProps> = ({
																											value,
																											tasks = [],
																											onAddTask,
																											renderTaskCount,
																											onSelectTask,
																											onClickToDate
																										}) => {
	
	return (
		<CellContainer
			disabled={value.meta.isDisabled}
			isCurrent={value.meta.isCurrent}
		>
			<FlexBlock
				position={'relative'}
				width={'100%'}
				height={50}
				justify={'flex-end'}
				wrap={'nowrap'}
				align={'center'}
				onClick={() => onClickToDate && onClickToDate(value)}
			>
				<CalendarDate
					isToday={value.meta.isToday}
					disabled={value.meta.isDisabled}
					isCurrent={value.meta.isCurrent}
				>
					{addNull(dayjs(value.value).date())}
				</CalendarDate>
			</FlexBlock>
			<TaskTileList
				tasks={tasks}
				date={value}
				onSelect={onSelectTask}
				renderTaskCount={renderTaskCount}
			/>
		</CellContainer>
	)
}

export const TaskTileList: FC<TaskTileListProps> = ({
																											tasks = [],
																											date,
																											onSelect,
																											renderTaskCount = 'all'
																										}) => {
	const length = useMemo(() => {
		return renderTaskCount !== 'all' ? renderTaskCount : tasks?.length || 5
	}, [renderTaskCount, tasks])
	
	if (!!tasks?.length) {
		return (
			<TaskTileContainer>
				{tasks.slice(0, length + 1).map((item, index) => (
					<TaskTileItem
						key={item.title + index}
						taskInfo={item}
						date={date}
						onSelect={onSelect}
					/>
				))}
				{tasks.length > length && (
					<FlexBlock width={'100%'} justify={'center'} align={'center'} mt={6} mb={6}>
						<TaskTileText style={{textAlign: 'center'}}>
							и еще {tasks.length - length}
						</TaskTileText>
					</FlexBlock>
				)}
			</TaskTileContainer>
		)
	}
	
	return <></>
}

export const TaskTilePriorityIndicator: FC<TaskTilePriorityIndicatorProps> = ({
																																								priority,
																																								isCompleted
																																							}) => {
	if (isCompleted) {
		return <Indicator color={'#9fd962'}/>
	}
	return (
		<Indicator color={priorityColors[priority]}/>
	)
}

export const TaskTileItem: FC<TaskTileItemProps> = ({taskInfo, onSelect, date}) => {
	const [isHover, setIsHover] = useState(false)
	
	const condition = useMemo(() => {
		return date.meta.isCurrent && !date.meta.isDisabled
	}, [date, taskInfo])
	
	return (
		<TaskTile
			onMouseEnter={() => condition && setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			withFill={isHover}
			disabled={date.meta.isDisabled}
			isCurrent={date.meta.isCurrent}
			onClick={(event) => condition && onSelect && onSelect(taskInfo.id)}
		>
			<TaskTilePriorityIndicator priority={taskInfo.priority}
																 isCompleted={taskInfo.status === 'completed'}/>
			<TaskTileText isCompleted={taskInfo.status === 'completed'}>
				{taskInfo.title}
			</TaskTileText>
			<TaskTimeValue>
				{addNull(dayjs(taskInfo.time).hour())}:{addNull(dayjs(taskInfo.time).minute())} UTC+{dayjs(taskInfo.time).utcOffset() / 60}
			</TaskTimeValue>
		</TaskTile>
	)
}

export const DayTimeFrame: FC<{ taskList: CalendarTaskList }> = ({taskList}) => {
	const arr = [
		'01:00',
		'02:00',
		'03:00',
		'04:00',
		'05:00',
		'06:00',
		'07:00',
		'08:00',
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00',
		'19:00',
		'20:00',
		'21:00',
		'22:00',
		'23:00',
		'00:00'
	]
	
	const taskContainerRef = useRef<HTMLDivElement | null>(null)
	return (
		<FlexBlock
			direction={'row'}
			align={'flex-start'}
			justify={'flex-start'}
			width={'100%'}
			height={800}
			overflow={'scroll'}
			style={{scrollBehavior: 'unset'}}
		>
			<FlexBlock direction={'column'} width={'100%'} align={'flex-start'}>
				00:00
				<FlexBlock direction={'row'} pb={5} width={'100%'}>
					<FlexBlock direction={'column'} width={100}>
						{arr.map((time, index) => (
							<FlexBlock width={'100%'}>
								
								<FlexBlock
									height={60}
									align={'flex-end'}
									justify={'flex-start'}
									width={100}
									position={'relative'}
									borderRight={'1px solid black'}
									borderBottom={'1px solid black'}
									borderTop={index === 0 ? '1px solid black' : ''}
									pb={5}
								>
									<FlexBlock position={'absolute'} width={'80%'} justify={'flex-end'}
														 align={'center'} bgColor={'#fff'}
														 pr={10}
														 style={{bottom: -10, left: 0}}>
										{time}
									</FlexBlock>
								</FlexBlock>
							</FlexBlock>
						))}
					</FlexBlock>
					<FlexBlock direction={'column'} width={'100%'} position={'relative'}>
						{arr.map((time, index) => (
							<FlexBlock width={'100%'}>
								<FlexBlock
									height={60}
									align={'flex-end'}
									justify={'center'}
									width={'100%'}
									borderBottom={'1px solid black'}
									borderTop={index === 0 ? '1px solid black' : ''}
								/>
							</FlexBlock>
						))}
						
						<FlexBlock
							direction={'column'}
							width={'100%'}
							position={'absolute'}
							height={'100%'}
							style={{top: 0, left: 0}}
							ref={taskContainerRef}
						>
							
							{taskList.map((item, index) => {
								// const els = item.intersectionCount + 1
								// const left = item.renderPriority === 1 ? 0 : ( ( item.renderPriority - 1 ) / els ) * 100
								// const width = 100 / ( item.intersectionCount + 1 )
								
								
								const isEarlyStart = (item: CalendarTaskItem, intersections: CalendarTaskList) => {
									const start = dayjs(item.time)
									// const end = dayjs( item.timeEnd )
									return intersections.every((intersection) => {
										const s = dayjs(intersection.time)
										return start.isBefore(s, 'minute')
									})
								}
								
								const isEarlyEnd = (item: CalendarTaskItem, intersections: CalendarTaskList) => {
									const end = dayjs(item.timeEnd)
									return intersections.every(
										(intersection) => {
											const e = dayjs(intersection.timeEnd)
											return end.isBefore(e, 'minute')
										}
									)
								}
								
								const isSomeoneAfterStart = (item: CalendarTaskItem, intersections: CalendarTaskList) => {
									const start = dayjs(item.timeEnd)
									return intersections.some(() => {
									
									})
								}
								
								let priority = 0
								let width = 33.33
								
								
								const duration = dayjs.duration(dayjs(item.timeEnd).diff(item.time)).asMinutes()
								const intersections = taskList.filter((intItem) => {
									if (intItem.id !== item.id) {
										const s = dayjs(intItem.time)
										const e = dayjs(intItem.timeEnd)
										return dayjs(item.time).isBetween(s, e, 'minutes', '[]')
											|| dayjs(item.timeEnd).isBetween(s, e, 'minutes', '[]')
									}
									return false
								})
								
								console.log(isEarlyStart(item, intersections))
								console.log(isEarlyEnd(item, intersections))
								
								const earlyS = isEarlyStart(item, intersections)
								const earlyE = isEarlyEnd(item, intersections)
								if (earlyS) {
									priority = 1
								} else {
									priority = 2
								}
								
								
								// const max = Math.max( ...intersections )
								// let step = max > 0 ? max + 1 : 1
								//
								// let left = ( 100 - ( 100 / intersections.length ) )
								// let width = 100
								// if( left <= 0 && step > 1 ) {
								//   left = 16.67
								// }
								//
								// if( left === 50 && step > 2 ) {
								//   left = 33.33
								// }
								//
								// if( left < 75 && step > 3 ) {
								//   left = 50
								// }
								//
								// if( left === 75 && step > 4 ) {
								//   left = 70
								// }
								//
								// if( left < 0 ) {
								//   left = 0
								// }
								//
								// if( left > 0 && step === 2 ) {
								//   width = 100 - left
								// }
								//
								// console.log( left, step, intersections )
								//
								//
								// objArr.push( { ...item, step } )
								
								return (
									<FlexBlock
										position={'absolute'}
										style={{
											top: dayjs(item.time).minute() + dayjs(item.time).hour() * 60,
											left: `${(priority - 1) * 10}%`,
											zIndex: priority,
											opacity: 1
										}}
										width={`${width}%`}
										border={'1px solid #fff'}
										bgColor={'cornflowerblue'}
										borderRadius={4}
										additionalCss={css`
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
										`}
										height={duration}
										p={4}
									>
                  <span
										style={{
											color: '#fff',
											paddingRight: 6
										}}>{addNull(dayjs(item.time).hour())}:{addNull(dayjs(item.time).minute())}</span>{item.title}
									</FlexBlock>
								)
							})}
						</FlexBlock>
					
					</FlexBlock>
				</FlexBlock>
			</FlexBlock>
		
		</FlexBlock>
	)
}
