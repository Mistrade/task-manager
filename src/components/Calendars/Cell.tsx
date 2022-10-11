import styled, {css, keyframes} from 'styled-components'
import React, {FC, useMemo, useRef, useState} from 'react'
import {
	CalendarCellProps,
	CalendarPriorityKeys,
	CalendarTaskItem,
	CalendarTaskList, EventItem,
	TaskTileItemProps,
	TaskTileListProps,
	TaskTilePriorityIndicatorProps
} from './types'
import {addNull} from '../../common/functions'
import {currentColor, defaultColor, disabledColor, hoverColor, priorityColors} from '../../common/constants'
import dayjs from 'dayjs'
import {FlexBlock, FlexBlockProps} from '../LayoutComponents/FlexBlock'
import {Arrow, BurgerIcon, CompleteIcon, DoubleArrow, IconProps, SadSmile} from '../Icons/Icons'
import {CalendarIdentifier} from "./CalendarList/CalendarList.styled";

interface CellComponentProps {
	disabled?: boolean,
	isCurrent?: boolean,
	isHover?: boolean
	isToday?: boolean,
	isVisible?: boolean
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
    transition: box-shadow .3s ease-in-out;
    ${_ => 'isVisible' in _ ?
            !_.isVisible
                    ? css`display: none`
                    : css`display: flex`
            : ''}
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
    gap: 4px;
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
																											onClickToDate,
																											isVisible
																										}) => {
	
	return (
		<CellContainer
			isVisible={isVisible}
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
	if (!!tasks?.length) {
		return (
			<TaskTileContainer>
				{tasks.map((item, index) => (
					<TaskTileItem
						key={item.title + index}
						taskInfo={item}
						date={date}
						onSelect={onSelect}
					/>
				))}
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
			<CalendarIdentifier
				color={taskInfo.calendar.color}
				size={13}
			/>
			<TaskTileText isCompleted={taskInfo.status === 'completed'}>
				{taskInfo.title}
			</TaskTileText>
			<TaskTimeValue>
				{addNull(dayjs(taskInfo.time).hour())}:{addNull(dayjs(taskInfo.time).minute())} UTC+{dayjs(taskInfo.time).utcOffset() / 60}
			</TaskTimeValue>
		</TaskTile>
	)
}