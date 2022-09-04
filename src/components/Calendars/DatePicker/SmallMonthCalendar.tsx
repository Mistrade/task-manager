import {FC, ReactNode, useCallback, useEffect, useMemo} from 'react'
import {
	CalendarCurrentMonth,
	CalendarCurrentWeek,
	CalendarDisabledOptions,
	CalendarItem,
	MonthItem,
	TaskStorage,
	WeekItem
} from '../types'
import styled, {css} from 'styled-components'
import {
	currentColor, darkColor,
	defaultColor,
	disabledColor,
	hoverColor, lightHoverColor,
	MonthList, orangeColor,
	WeekDaysShortList
} from '../../../common/constants'
import {FlexBlock, pxToCssValue, UnitsType} from '../../LayoutComponents/FlexBlock'
import dayjs from 'dayjs'
import {SmallWeekItem} from './SmallWeekItem'
import {GetTaskSchemeResponse} from "../../../store/api/taskApi";
import {addNull} from "../../../common/functions";
import {Tooltip} from "../../Tooltip/Tooltip";

export interface PourDatesProps {
	type: 'week' | 'month'
	date: Date,
}

interface SmallCalendarProps extends Pick<StyledProps, 'cellSize'> {
	current: CalendarCurrentMonth,
	currentDate?: Date,
	onSelectDate?: OnSelectDateFromCalendarFn,
	renderNotCurrent?: boolean,
	disabledOptions?: CalendarDisabledOptions,
	monthItem: MonthItem,
	title?: ReactNode,
	onSelectWeek?: (current: CalendarCurrentWeek) => void,
	//TODO убрать taskStorage
	taskStorage?: TaskStorage,
	includesTasks?: GetTaskSchemeResponse,
	pourDates?: PourDatesProps
}

interface StyledProps {
	cellSize?: UnitsType,
	rows: number
}

export type OnSelectDateFromCalendarFn = (data: CalendarItem) => void

interface WeekCountLayoutProps extends StyledProps {
	onClickToItem?: (weekItem: WeekItem) => void,
	weekItemList: Array<WeekItem>,
	hoverable?: boolean
}

interface WeekDaysLayoutProps extends StyledProps {

}

const Grid = styled('div')<StyledProps>`
  display: grid;
  grid-template-columns: repeat(8, ${props => props.cellSize ? pxToCssValue(props.cellSize) : '24px'});
  grid-template-rows: repeat(${props => props.rows}, ${props => props.cellSize ? pxToCssValue(props.cellSize) : '24px'});
  grid-gap: 4px;
  position: relative;
`

const WeekDayGrid = styled('div')<StyledProps>`
  grid-column-start: 2;
  grid-column-end: 9;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(8, ${props => props.cellSize ? pxToCssValue(props.cellSize) : '24px'});
  grid-gap: 4px;
  position: relative;
`

const WeekGrid = styled('div')<StyledProps>`
  grid-row-start: 2;
  grid-row-end: 8;
  grid-column: 1;
  display: grid;
  grid-template-rows: repeat(auto-fill, ${props => props.cellSize ? pxToCssValue(props.cellSize) : '24px'});
  grid-gap: 4px;
  position: relative;
`


const WeekCountHoverMixin = css`
  background-color: transparent;
  transition: all .3s ease-in-out;
  cursor: pointer;

  &:hover {
    border-radius: 4px;
    background-color: ${currentColor};
    color: #fff;
    border-right: none;
  }
`

const WeekCountLayout: FC<WeekCountLayoutProps> = ({
																										 onClickToItem = undefined,
																										 weekItemList = [],
																										 hoverable,
																										 cellSize,
																										 rows = 1
	
																									 }) => {
	return (
		<WeekGrid cellSize={cellSize} rows={rows}>
			{weekItemList.map((week) => (
				<FlexBlock
					key={`weekCount_${week.weekOfYear}`}
					justify={'center'}
					align={'center'}
					width={'100%'}
					height={'100%'}
					borderRight={`1px solid ${defaultColor}`}
					bgColor={'transparent'}
					additionalCss={hoverable ? WeekCountHoverMixin : undefined}
					onClick={() => onClickToItem && onClickToItem(week)}
				>
					{week.weekOfYear}
				</FlexBlock>
			))}
		</WeekGrid>
	)
}

const WeekDaysLayout: FC<WeekDaysLayoutProps> = ({cellSize, rows}) => {
	return (
		<WeekDayGrid cellSize={cellSize} rows={rows}>
			{WeekDaysShortList.map(item => (
				<FlexBlock
					key={`weekDay_${item}_short`}
					justify={'center'}
					align={'center'}
					width={'100%'}
					height={'100%'}
					borderBottom={`1px solid ${defaultColor}`}
				>
					{item}
				</FlexBlock>
			))}
		</WeekDayGrid>
	)
}

export const SmallMonthCalendar: FC<SmallCalendarProps> = ({
																														 monthItem,
																														 cellSize,
																														 current,
																														 currentDate,
																														 onSelectDate,
																														 renderNotCurrent = true,
																														 title,
																														 onSelectWeek,
																														 taskStorage,
																														 includesTasks,
																														 pourDates
																													 }) => {
	
	const onClickToWeekCountItem = useCallback((weekItem: WeekItem) => {
		onSelectWeek && onSelectWeek({
			layout: 'week',
			aroundDate: dayjs().set('year', weekItem.year).set('month', weekItem.month).week(weekItem.weekOfYear).toDate()
		})
	}, [onSelectWeek])
	
	return (
		<FlexBlock
			justify={'center'}
			align={'center'}
		>
			<FlexBlock direction={'column'} position={'relative'}>
				
				{title || (<h2>{MonthList[monthItem.monthOfYear]}</h2>)}
				
				<Grid cellSize={cellSize} rows={monthItem.weeks.length + 1}>
					<div/>
					<WeekDaysLayout
						//Компонент отображающий дни недели
						cellSize={cellSize}
						rows={0}
					/>
					<WeekCountLayout
						//Компонент, рисующий сетку с порядковым номером недель
						weekItemList={monthItem.weeks}
						hoverable={!!onSelectWeek}
						rows={1}
						onClickToItem={onClickToWeekCountItem}
						cellSize={cellSize}
					/>
					<SmallWeekItem
						//Компонент отображающий даты по неделям
						
						currentDate={currentDate}
						monthItem={monthItem}
						onSelectDate={onSelectDate}
						taskStorage={taskStorage}
						includesTasks={includesTasks}
					/>
				</Grid>
			</FlexBlock>
		
		</FlexBlock>
	
	)
}


interface SmallMonthProps {
	currentDate?: Date,
	onSelectDate?: OnSelectDateFromCalendarFn,
	monthItem: MonthItem,
	title?: ReactNode,
	onSelectWeek?: (current: CalendarCurrentWeek) => void,
	includesTasks?: GetTaskSchemeResponse,
	pourDates?: PourDatesProps,
	useTooltips?: boolean
}

export const SmallMonth: FC<SmallMonthProps> = ({
																									onSelectDate,
																									monthItem,
																									currentDate,
																									includesTasks,
																									pourDates,
																									onSelectWeek,
																									title,
																									useTooltips,
																								}) => {
	return (
		<FlexBlock
			justify={'center'}
			align={'center'}
		>
			<FlexBlock direction={'column'} gap={4}>
				<FlexBlock>
					{title || (<h2>{MonthList[monthItem?.monthOfYear || 1]}</h2>)}
				</FlexBlock>
				<SmallMonthRow>
					<FlexBlock className={'row--item'}/>
					{WeekDaysShortList.map((item, index, arr) => (
						<FlexBlock
							className={'row--item'}
							key={`weekDay_${item}_short`}
							borderBottom={`1px solid ${defaultColor}`}
						>
							{item}
						</FlexBlock>
					))}
				</SmallMonthRow>
				{monthItem?.weeks.map((weekItem) => (
					<SmallMonthWeekItem
						useTooltips={useTooltips}
						key={`short-week-${weekItem.weekOfYear}`}
						onSelectWeek={onSelectWeek}
						onSelectDate={onSelectDate}
						weekItem={weekItem}
						pourDates={pourDates}
						currentDate={currentDate}
						taskScheme={includesTasks}
					/>
				))}
			</FlexBlock>
		</FlexBlock>
	)
}

interface SmallMonthWeekItemProps extends Pick<SmallMonthProps, 'onSelectWeek' | 'onSelectDate' | 'useTooltips'> {
	pourDates?: PourDatesProps,
	weekItem: WeekItem,
	currentDate?: Date,
	taskScheme?: GetTaskSchemeResponse,
}

const checkIsPouredWeek = (weekItem: WeekItem, pourDate: PourDatesProps) => {
	const date = dayjs(pourDate.date)
	return date.week() === weekItem.weekOfYear && date.year() === weekItem.year
}

interface CheckPourMonthResult {
	firstPour: Date,
	lastPour: Date
}

const checkPourMonth = (pourDate: PourDatesProps): CheckPourMonthResult | null => {
	if (pourDate.type === 'month') {
		const date = dayjs(pourDate.date)
		
		return {
			firstPour: date.startOf('month').toDate(),
			lastPour: date.endOf('month').toDate()
		}
	}
	
	return null
}

const SmallMonthWeekItem: FC<SmallMonthWeekItemProps> = ({
																													 pourDates,
																													 weekItem,
																													 currentDate,
																													 taskScheme,
																													 onSelectWeek,
																													 onSelectDate,
																													 useTooltips
																												 }) => {
	const weekIsPoured = useMemo(() => {
		return pourDates?.type === 'week' && checkIsPouredWeek(weekItem, pourDates)
	}, [weekItem, pourDates])
	
	const selectWeekHandle = useCallback(() => {
		onSelectWeek && onSelectWeek({
			layout: 'week',
			aroundDate: weekItem.days[0].value
		})
	}, [weekItem, onSelectWeek])
	
	useEffect(() => {
		console.log(currentDate)
	}, [currentDate])
	
	return (
		<SmallMonthRow
			isPoured={weekIsPoured}
		>
			<SmallMonthWeekCount
				onClick={selectWeekHandle}
			>
				{weekItem.weekOfYear}
			</SmallMonthWeekCount>
			{weekItem.days.map((day, index) => {
					const isSelect = currentDate && dayjs(currentDate).isSame(day.value, 'date')
					
					if (useTooltips && (day.meta.isToday || isSelect)) {
						return (
							<Tooltip
								text={day.meta.isToday ? 'Сегодня' : 'Выбранный день календаря'}
								key={`short-date-${day.value.toString()}`}
								placement={'right'}
							>
								<SmallMontDateItem
									date={day}
									currentDate={currentDate}
									taskScheme={taskScheme}
									onSelectDate={onSelectDate}
									pour={pourDates?.type === 'month' ? checkPourMonth(pourDates) : null}
									isSelect={isSelect}
								/>
							</Tooltip>
						)
					}
					
					return (
						<SmallMontDateItem
							key={`short-date-${day.value.getDate()}`}
							date={day}
							currentDate={currentDate}
							taskScheme={taskScheme}
							onSelectDate={onSelectDate}
							pour={pourDates?.type === 'month' ? checkPourMonth(pourDates) : null}
							isSelect={isSelect}
						/>
					)
				}
			)}
		</SmallMonthRow>
	)
}

interface SmallMonthDateItemProps {
	date: CalendarItem,
	currentDate?: Date,
	taskScheme?: GetTaskSchemeResponse,
	pour: CheckPourMonthResult | null,
	onSelectDate?: SmallMonthWeekItemProps['onSelectDate'],
	isSelect?: boolean
}

const SmallMontDateItem: FC<SmallMonthDateItemProps> = ({
																													date,
																													currentDate,
																													pour,
																													taskScheme,
																													onSelectDate,
																													isSelect
																												}) => {
	return (
		<SmallMonthRowItem
			onClick={() => onSelectDate && onSelectDate(date)}
			isFirstPoured={pour?.firstPour && dayjs(date.value).isSame(pour?.firstPour, 'day')}
			isPoured={pour?.firstPour && pour?.lastPour && dayjs(date.value).isBetween(pour?.firstPour, pour?.lastPour, 'day', '()')}
			isLastPoured={pour?.lastPour && dayjs(date.value).isSame(pour?.lastPour, 'day')}
			isDisabled={date.value.getMonth() !== currentDate?.getMonth()}
			isToday={date.meta.isToday}
			isSelect={isSelect}
			hasTasks={taskScheme && !!taskScheme[dayjs(date.value).format('DD-MM-YYYY')]}
		>
			{addNull(dayjs(date.value).date())}
		</SmallMonthRowItem>
	)
}


const isPouredWeekCountItem = css`
  & {
    border-radius: 4px;
      //background-color: ${lightHoverColor};
    box-shadow: 0px 0px 10px 2px ${lightHoverColor};
    border: 1px solid ${defaultColor};
		margin-left: -4px;
		padding-left: 4px;
		margin-right: -4px;
		padding-right: 4px;
  }
`

const isFirstPouredCss = css`
  & {
    margin-top: 6px;
    margin-bottom: 6px;
  }
	
  &:before {
		left: -4px;
		width: calc(100% + 3px);
    height: 100%;
    padding: 6px 0px;
    border-radius: 4px 0px 0px 4px;
      //background-color: ${lightHoverColor};
    box-shadow: -2px 0px 10px 2px ${lightHoverColor};
    border-top: 1px solid ${defaultColor};
    border-bottom: 1px solid ${defaultColor};
    border-left: 1px solid ${defaultColor};
    border-right: none;
  }
`
const isPouredCss = css`
  & {
    margin-top: 6px;
		margin-bottom: 6px;
  }
  &:before {
		height: 100%;
		padding: 6px 0px;
    border-radius: 0px;
      //background-color: ${lightHoverColor};
    box-shadow: 0px 0px 10px 2px ${lightHoverColor};
    border-top: 1px solid ${defaultColor};
    border-bottom: 1px solid ${defaultColor};
    border-left: none;
    border-right: none;
  }
`
const isLastPouredCss = css`
  & {
    margin-top: 6px;
    margin-bottom: 6px;
  }
  &:before {
		right: -4px;
		width: calc(100% + 3px);
    height: 100%;
    padding: 6px 0px;
    border-radius: 0px 4px 4px 0px;
      //background-color: ${lightHoverColor};
    box-shadow: 2px 0px 10px 2px ${lightHoverColor};
    border-top: 1px solid ${defaultColor};
    border-bottom: 1px solid ${defaultColor};
    border-left: none;
    border-right: 1px solid ${defaultColor};
  }
`

const isPouredDate = ({
												isPoured,
												isLastPoured,
												isFirstPoured
											}: Pick<SmallMonthRowItemProps, 'isPoured' | 'isLastPoured' | 'isFirstPoured'>) => css`
  &:before {
    position: absolute;
    top: -6px;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
  }

  ${(isFirstPoured && isFirstPouredCss) || (isPoured && isPouredCss) || (isLastPoured && isLastPouredCss)}
`

const SmallMonthWeekCount = styled(FlexBlock)`
  justify-content: center;
  align-items: center;
  width: 25px;
  //height: 25px;
  border-right: 1px solid ${defaultColor};
  background-color: transparent;
`

interface SmallMonthRowItemProps {
	isDisabled?: boolean,
	isToday?: boolean,
	isSelect?: boolean,
	hasTasks?: boolean,
	isPoured?: boolean,
	isLastPoured?: boolean,
	isFirstPoured?: boolean
}

interface SmallMonthRowProps {
	isPoured?: boolean
}

const isSelectRowItem = css`
  & {
    border-radius: 4px;
    color: #fff;
    background-color: ${currentColor};
  }
`

const isTodayRowItem = css`
  & {
    border-radius: 4px;
    color: #fff;
    background-color: ${orangeColor};
  }
`

const hasTasksRowItem = css`
  & {
    border-radius: 4px;
    background-color: ${hoverColor};
  }
`

const SmallMonthRowItem = styled('div')<SmallMonthRowItemProps>`
  & {
    z-index: 1;
    position: relative;
    font-size: 15px;
		line-height: 1;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: ${_ => _.isDisabled ? disabledColor : darkColor};
  }

  ${_ => _.hasTasks && hasTasksRowItem}
  ${_ => _.isSelect && isSelectRowItem}
  ${_ => _.isToday && isTodayRowItem}
  ${_ => isPouredDate(_)}

`

const SmallMonthRow = styled('div')<SmallMonthRowProps>`
  & {
    display: flex;
    flex-direction: row;
    width: fit-content;
		height: fit-content;
    flex-wrap: nowrap;
    gap: 4px;
		padding: ${_ => _.isPoured ? '6px 0px' : 'none'};
		justify-content: flex-start;
		align-items: center;
  }

  & .row--item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    //height: 25px;
  }

  ${_ => _.isPoured && isPouredWeekCountItem}

`