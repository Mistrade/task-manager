import styled, {css, keyframes} from 'styled-components'
import React, {FC} from 'react'
import {CalendarCellProps} from '../../../types'
import {addNull} from '../../../../../common/functions'
import {borderRadiusSize, currentColor, defaultColor, disabledColor, hoverColor} from '../../../../../common/constants'
import dayjs from 'dayjs'
import {FlexBlock} from '../../../../LayoutComponents/FlexBlock'
import {CalendarCellEventsList} from "./EventList/List";

export interface CalendarCellStyledComponentProps {
	disabled?: boolean,
	isCurrent?: boolean,
	isHover?: boolean
	isToday?: boolean,
	isVisible?: boolean
}

export const CalendarDate = styled('span')<CalendarCellStyledComponentProps>`
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

export const WeekCellContainer = styled('div')<CalendarCellStyledComponentProps>`
  & {
    position: relative;
    width: 100%;
    height: fit-content;
    display: flex;
    padding: 4px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    border-radius: ${borderRadiusSize.sm};
    box-shadow: none;
    border: 1px solid ${defaultColor};
    //transition: all .3s ease-in;
    //opacity: .2;
    transition: box-shadow .3s ease-in-out, height .3s ease-in;
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
          box-shadow: 0 4px 8px 6px ${disabledColor};
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
    border-radius: ${borderRadiusSize.xs};
    animation: .3s ease-in-out ${addTaskAnimation} forwards;
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
		<WeekCellContainer
			isVisible={isVisible}
			disabled={value.meta.isDisabled}
			isCurrent={value.meta.isCurrent}
		>
			<FlexBlock
				position={'relative'}
				width={'100%'}
				height={50}
				borderRadius={borderRadiusSize.sm}
				justify={'flex-end'}
				wrap={'nowrap'}
				align={'center'}
				onClick={() => onClickToDate && onClickToDate(value)}
				additionalCss={onClickToDate && css`
          &:hover {
            background-color: ${hoverColor};
          }
				`}
			>
				<CalendarDate
					isToday={value.meta.isToday}
					disabled={value.meta.isDisabled}
					isCurrent={value.meta.isCurrent}
				>
					{addNull(dayjs(value.value).date())}
				</CalendarDate>
			</FlexBlock>
			<CalendarCellEventsList
				tasks={tasks}
				date={value}
				onSelect={onSelectTask}
			/>
		</WeekCellContainer>
	)
}

