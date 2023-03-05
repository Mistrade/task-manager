import {FC, useCallback, useEffect, useRef, useState} from 'react'
import {CalendarItem, WeekCalendarProps, WeekItem} from '../../planner.types'
import dayjs from 'dayjs'
import {CalendarCell} from './CalendarCell/Cell'
import styled, {css} from 'styled-components'
import {borderRadiusSize, currentColor, defaultColor, disabledColor, orangeColor} from '../../../../common/constants'
import {getTaskListOfDay} from "../../../../common/functions";
import {WeekNumberTitle} from "./SupportComponents/WeekNumberTitle";
import {retry} from "@reduxjs/toolkit/query";
import {Accordion} from "../../../../components/Accordion/Accordion";
import {Heading} from '../../../../components/Text/Heading'
import {Badge} from '../../../../components/Badge/Badge'
import {FlexBlock} from '../../../../components/LayoutComponents/FlexBlock'
import {NonViewScroller, ScrollContainer} from "../../TaskInformer/LeftBar/Tabs/TaskComments/TaskComments";

interface StyledProps {
	isVisible?: boolean
}

const WeekContainer = styled('div')`
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
	padding-top: 12px;
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
    width: calc(100% + 16px);
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
    margin-left: -8px;
    margin-right: -8px;
    padding-left: 8px;
    padding-right: 8px;
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
		current.layout === 'month'
		&& onChangeCurrent
		&& onChangeCurrent(dayjs().set('year', current.year).week(item.weekOfYear).toDate(), 'week')
	}, [onChangeCurrent, current.layout])
	
	const onClickToDate = useCallback((date: CalendarItem) => {
		onChangeCurrent && onChangeCurrent(date.value, 'day')
	}, [onChangeCurrent])
	
	const ref = useRef<HTMLDivElement>(null)
	
	useEffect(() => {
		if (current.layout === 'month') {
			ref.current?.scrollIntoView({
				block: "start",
				behavior: "auto"
			})
		}
	}, [current, taskStorage])
	
	if (current.layout === 'month') {
		const isCurrentWeek = dayjs().week() === weekItem.weekOfYear
		return (
			<WeekContainer>
				{isCurrentWeek && <NonViewScroller ref={ref}/>}
				<Accordion
					title={
						<Heading.H2
							style={{color: currentColor, fontSize: 18}}
						>
							<FlexBlock direction={'row'} gap={6}>
								{[
									`Неделя ${weekItem.weekOfYear}`,
									isCurrentWeek
										? <Badge style={{fontWeight: "normal", backgroundColor: orangeColor, color: "#fff"}}>сегодня</Badge>
										: <></>,
								]}
							</FlexBlock>
						</Heading.H2>
					}
				>
					<DaysContainer>
						{weekItem.days.map((day) => (
							<CalendarCell
								isVisible={true}
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
				</Accordion>
			</WeekContainer>
		)
	}
	
	
	return (
		<WeekContainer>
			<DaysContainer>
				{weekItem.days.map((day) => (
					<CalendarCell
						isVisible={true}
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
