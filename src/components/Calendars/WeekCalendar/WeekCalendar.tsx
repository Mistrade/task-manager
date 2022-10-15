import {FC, useCallback, useState} from 'react'
import {CalendarItem, WeekCalendarProps, WeekItem} from '../types'
import dayjs from 'dayjs'
import {CalendarCell} from '../Cell'
import styled, {css} from 'styled-components'
import {defaultColor, disabledColor, lightHoverColor} from '../../../common/constants'
import {getTaskListOfDay} from "../../../common/functions";
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {EmptyButtonStyled} from "../../Buttons/EmptyButton.styled";

const WeekContainer = styled('div')<{ isVisible?: boolean }>`
  position: relative;
  grid-column-start: 1;
  grid-column-end: 8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  transition: all .3s ease-in;
	border: 1px solid transparent;

  ${_ => !_.isVisible ? css`
            border: 1px solid ${defaultColor};
            overflow: hidden;
            border-radius: 4px;
          `
          : 'none'}
`

const DaysContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, minmax(80px, 1fr));
  grid-column-gap: 4px;
  width: 100%;
  max-height: fit-content;
  transition: all .3s ease-in;
`

const WeekOfYearTitle = styled('h3')`
  & {
    font-size: 20px;
    width: 100%;
    text-align: left;
    gap: 8px;
    color: ${disabledColor};
    background-color: #fff;
    z-index: 9;
    position: sticky;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: all .3s ease-in-out;
  }
`

export const WeeKCalendar: FC<WeekCalendarProps> = ({
																											weekItem,
																											renderTaskCount,
																											onSelectTask,
																											onAddTask,
																											onChangeCurrent,
																											current,
																											taskStorage
																										}) => {
	
	const onSelectWeek = useCallback((item: WeekItem) => {
		if (current.layout === 'month' && onChangeCurrent) {
			onChangeCurrent(dayjs().set('year', current.year).week(item.weekOfYear).toDate(), 'week')
		}
	}, [onChangeCurrent, current.layout])
	
	const onClickToDate = useCallback((date: CalendarItem) => {
		onChangeCurrent && onChangeCurrent(date.value, 'day')
	}, [onChangeCurrent])
	
	const [isVisible, setIsVisible] = useState(true)
	
	return (
		<WeekContainer isVisible={isVisible}>
			{current.layout === 'month' && (
				<WeekOfYearTitle
					onClick={() => onSelectWeek(weekItem)}
				>
					<FlexBlock align={'center'} justify={'space-between'} gap={8} mb={isVisible ? 8 : 0}>
						<FlexBlock
							width={'100%'}
							pl={8}
							pt={4}
							pb={4}
							color={defaultColor}
							additionalCss={css`
                & {
                  color: ${defaultColor};
                }

                &:hover {
                  background-color: ${lightHoverColor};
                  border-radius: 4px;
                }
							`}
						>
							неделя {weekItem.weekOfYear}
						</FlexBlock>
						<EmptyButtonStyled
							style={{color: defaultColor}}
							onClick={(e) => {
								e.stopPropagation()
								setIsVisible((prev) => !prev)
							}}
						>
							{isVisible ? 'Скрыть' : 'Показать'}
						</EmptyButtonStyled>
					</FlexBlock>
				</WeekOfYearTitle>
			)}
			<DaysContainer style={{maxHeight: isVisible ? 'fit-content' : 0}}>
				{weekItem.days.map((day) => (
					<CalendarCell
						isVisible={isVisible}
						tasks={getTaskListOfDay(day.value, taskStorage)}
						renderTaskCount={renderTaskCount}
						key={`date_year_${weekItem.year}_month_${weekItem.month}_${day.value.getDate()}`}
						onAddTask={onAddTask}
						value={day}
						onClickToDate={onClickToDate}
						onSelectTask={onSelectTask}
					/>
				))}
			</DaysContainer>
		</WeekContainer>
	)
}
