import {CalendarDisabledOptions, CalendarMode, CalendarProps, DateItem, MonthItem, WeekItem, YearItem} from './types'
import React, {FC, useEffect, useState} from 'react'
import {CurrentObserver} from '../../common/functions'
import {useCalendar} from '../../hooks/useCalendar'
import {CalendarHeader} from './Header/CalendarHeader'
import {TaskInfoModal} from './CalendarModals/TaskInfoModal'
import {AddTaskModal} from './CalendarModals/AddTaskModal'
import {FlexBlock} from '../LayoutComponents/FlexBlock'
import {
	defaultDateItem,
	defaultMonthItem,
	defaultWeekItem,
	defaultYearItem,
	disabledColor,
	ERROR_TITLES,
	pageHeaderColor,
	WeekDaysList
} from '../../common/constants'
import {Interceptor} from './Interceptor'
import {ErrorBoundary} from "../Errors/ErrorBoundary";
import {Loader} from "../Loaders/Loader";
import {Route, Routes} from 'react-router-dom'
import {CalendarSettingsPanel} from "./DayCalendar/CalendarSettingsPanel";
import dayjs from "dayjs";
import {getMonthDays} from "../../common/calendarSupport/getters";
import {WeekDays} from "./WeekDays/WeekDays";
import {ChangeCalendarModal} from "./CalendarModals/CreateCalendar";
import {RemoveCalendarHock, RemoveCalendarModal} from "./CalendarModals/RemoveCalendarModal";
import {css} from "styled-components";
import {ChangeCalendarHock} from "./CalendarList/ChangeCalendarHock";

const DayCalendar = React.lazy(() => import('./DayCalendar/DayCalendar').then(({DayCalendar}) => ({default: DayCalendar})))
const WeekCalendar = React.lazy(() => import('./WeekCalendar/WeekCalendarController').then(({WeekCalendarController}) => ({default: WeekCalendarController})))
const MonthCalendar = React.lazy(() => import('./MonthCalendar/MonthCalendar').then(({MonthCalendar}) => ({default: MonthCalendar})))
const YearCalendar = React.lazy(() => import('./YearCalendar/YearCalendar').then(({YearCalendar}) => ({default: YearCalendar})))

export const Calendar: FC<CalendarProps> = ({
																							layout,
																							taskStatus,
																							disabledOptions,
																							renderWeekPattern = 'full',
																						}) => {
	const calendar = useCalendar()
	
	const [yearItem, setYearItem] = useState<YearItem>(defaultYearItem)
	const [monthItem, setMonthItem] = useState<MonthItem>(defaultMonthItem)
	const [weekItem, setWeekItem] = useState<WeekItem>(defaultWeekItem)
	const [dateItem, setDateItem] = useState<DateItem>(defaultDateItem)
	
	useEffect(() => {
		changeCurrentObserver(calendar.current, disabledOptions)
	}, [calendar.current, disabledOptions])
	
	const changeCurrentObserver = (current: CalendarMode, disabledOptions?: CalendarDisabledOptions) => {
		const {layout} = current
		
		switch (layout) {
			case 'year':
				return setYearItem(prev => CurrentObserver.year(prev, current, disabledOptions))
			case 'month':
				return setMonthItem(prev => CurrentObserver.month(prev, current, disabledOptions))
			case 'week':
				return setWeekItem(prev => CurrentObserver.week(prev, current, disabledOptions))
			case 'day':
				return setDateItem(prev => CurrentObserver.date(prev, current, disabledOptions))
		}
	}
	
	const checkMonthItemSettingsPanel = (current: CalendarMode): MonthItem => {
		switch (current.layout) {
			case "day":
				return dateItem.settingPanel.monthItem
			case "week":
				const date = dayjs(current.aroundDate)
				return getMonthDays({
					layout: 'month',
					month: date.month(),
					year: date.year()
				}, {useOtherDays: true})
			case "month":
				return monthItem
			case "year":
				const d = dayjs()
				return getMonthDays({
					layout: 'month',
					month: d.month(),
					year: d.year()
				}, {useOtherDays: true})
		}
	}
	
	return (
		<>
			<FlexBlock
				position={'relative'}
				align={'flex-start'}
				direction={'column'}
				grow={3}
				width={'100%'}
				height={'100%'}
				p={0}
				overflow={'hidden'}
			>
				<CalendarHeader/>
				<FlexBlock
					width={'100%'}
					height={'100vh'}
					direction={'row'}
					justify={'flex-start'}
					gap={24}
					align={'flex-start'}
					overflow={'hidden'}
				>
					<FlexBlock
						height={'100%'}
						grow={0}
						shrink={0}
						maxWidth={300}
						bgColor={pageHeaderColor}
						pr={12}
						pl={24}
						pt={24}
						flex={'1 0 20%'}
						borderRight={`1px solid ${disabledColor}`}
					>
						<CalendarSettingsPanel
							monthItem={checkMonthItemSettingsPanel(calendar.current)}
							current={calendar.current}
							onSelectDate={(data) => calendar.onChangeCurrent(data.value, 'day')}
						/>
					</FlexBlock>
					<FlexBlock flex={'1 0 80%'} pr={24} height={'100%'} additionalCss={css`z-index: 0`}>
						{layout === 'year' ? (
							<Interceptor
								shouldRenderChildren={yearItem.year > 0 && yearItem.months.length > 0}
							>
								<React.Suspense fallback={<Loader title={'Загружаем ваш календарь, секундочку...'} isActive={true}/>}>
									<YearCalendar
										yearItem={yearItem}
										onChangeCurrent={calendar.onChangeCurrent}
									/>
								</React.Suspense>
							</Interceptor>
						) : layout === 'month' ? (
							<Interceptor
								shouldRenderChildren={monthItem.monthOfYear >= 0 && monthItem.weeks.length > 0}
							>
								<React.Suspense
									fallback={
										<Loader title={'Загружаем ваш календарь, секундочку...'} isActive={true}/>
									}
								>
									<MonthCalendar
										onChangeCurrent={calendar.onChangeCurrent}
										renderWeekPattern={renderWeekPattern}
										renderTaskCount={5}
										current={calendar.current}
										monthItem={monthItem}
										onAddTask={calendar.onAddTask}
										onSelectTask={calendar.onSelectTask}
									/>
								</React.Suspense>
							</Interceptor>
						) : layout === 'week' ? (
							<Interceptor
								shouldRenderChildren={weekItem.weekOfYear > 0 && weekItem.days.length > 0}
							>
								<React.Suspense fallback={<Loader title={'Загружаем ваш календарь, секундочку...'} isActive={true}/>}>
									<WeekCalendar
										onChangeCurrent={calendar.onChangeCurrent}
										current={calendar.current}
										weekItem={weekItem}
										renderTaskCount={'all'}
										onAddTask={calendar.onAddTask}
										onSelectTask={calendar.onSelectTask}
									/>
								</React.Suspense>
							</Interceptor>
						) : layout === 'day' ? (
							<Interceptor
								shouldRenderChildren={dateItem.settingPanel.monthItem.weeks.length > 0}
							>
								<React.Suspense fallback={<Loader title={'Загружаем ваш календарь, секундочку...'} isActive={true}/>}>
									<DayCalendar
										dateItem={dateItem}
										onAddTask={calendar.onAddTask}
										onSelectTask={calendar.onSelectTask}
									/>
								</React.Suspense>
							</Interceptor>
						) : <></>}
					</FlexBlock>
				</FlexBlock>
				<ErrorBoundary
					title={ERROR_TITLES['CALENDAR_RENDER']}
					description={ERROR_TITLES['SUSPENSE']}
					errorType={'SYSTEM_ERROR'}
				>
					<RemoveCalendarHock
						calendarItem={calendar.calendarRemoveCandidate}
						onClose={() => calendar.onSelectToRemoveCalendar(null)}
						onSuccess={() => calendar.onSelectToRemoveCalendar(null)}
					/>
					<Routes>
						<Route
							path={'calendar/:calendarId'}
							element={
								<ChangeCalendarHock
									onClose={calendar.onCloseAddCalendarModal}
								/>
							}
						/>
						<Route
							path={'add'}
							element={
								<AddTaskModal
									date={calendar.addTaskDate}
									onClose={calendar.onCloseAddTaskModal}
									clonedEventInfo={calendar.clonedEventInfo}
									onSuccessClonedEvent={calendar.onSuccessClonedEvent}
								/>
							}
						/>
						<Route
							path={':taskId'}
							element={
								<TaskInfoModal
									onClose={calendar.onCloseTaskInfo}
									onCloneEvent={calendar.onCloneEvent}
									onOpenClonedEvent={calendar.onSelectTask}
								/>
							}
						/>
					</Routes>
				</ErrorBoundary>
			</FlexBlock>
		</>
	)
}
