import {
	CalendarCurrentFavorites,
	CalendarCurrentList,
	CalendarDisabledOptions,
	CalendarMode,
	CalendarProps,
	DateItem,
	MonthItem,
	WeekItem,
	YearItem
} from './types'
import React, {FC, useEffect, useState} from 'react'
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
	pageHeaderColor
} from '../../common/constants'
import {Interceptor} from './Interceptor'
import {ErrorBoundary} from "../Errors/ErrorBoundary";
import {Loader} from "../Loaders/Loader";
import {Route, Routes} from 'react-router-dom'
import {CalendarSettingsPanel} from "./Modes/DayCalendar/CalendarSettingsPanel";
import {ChangeCalendarModal} from "./CalendarModals/CreateCalendar";
import {RemoveCalendarHock} from "./CalendarModals/RemoveCalendarModal";
import {css} from "styled-components";
import {ChangeCalendarHock} from "./CalendarList/ChangeCalendarHock";
import {DateListGenerator} from "../../common/calendarSupport/generators";
import {CalendarObserver} from "../../common/calendarSupport/observer";

const DayCalendar = React.lazy(() => import('./Modes/DayCalendar/DayCalendar').then(({DayCalendar}) => ({default: DayCalendar})))
const WeekCalendar = React.lazy(() => import('./Modes/WeekCalendar/WeekCalendarController').then(({WeekCalendarController}) => ({default: WeekCalendarController})))
const MonthCalendar = React.lazy(() => import('./Modes/MonthCalendar/MonthCalendar').then(({MonthCalendar}) => ({default: MonthCalendar})))
const YearCalendar = React.lazy(() => import('./Modes/YearCalendar/YearCalendar').then(({YearCalendar}) => ({default: YearCalendar})))
const ListCalendar = React.lazy(() => import('./Modes/List/ListCalendarMode').then(({ListCalendarMode}) => ({default: ListCalendarMode})))
const FavoritesCalendar = React.lazy(() => import('./Modes/FavoritesCalendar/FavoritesCalendar').then(({FavoritesCalendar}) => ({default: FavoritesCalendar})))

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
		const observer = new CalendarObserver(disabledOptions)
		
		
		switch (layout) {
			case 'year':
				return setYearItem(
					prev => observer.getYearItem(prev, new Date(current.year, 0, 1))
				)
			case 'month':
				return setMonthItem(
					prev => observer.getMonthItem(prev, new Date(current.year, current.month))
				)
			case 'week':
				return setWeekItem(
					observer.getWeekItem(current.aroundDate)
				)
			case 'day':
				return setDateItem(
					prev => observer.getDateItem(prev, current)
				)
		}
	}
	
	const checkMonthItemSettingsPanel = (current: CalendarMode): MonthItem => {
		switch (current.layout) {
			case "day":
				return dateItem.settingPanel.monthItem
			case "week":
				return new DateListGenerator({useOtherDays: true})
					.getMonthItem(current.aroundDate)
			case "month":
				return monthItem
			case "year":
				return new DateListGenerator({useOtherDays: true})
					.getMonthItem()
			case "list":
				return new DateListGenerator({useOtherDays: true})
					.getMonthItem(current.fromDate)
			case "favorites":
				return new DateListGenerator({useOtherDays: true})
					.getMonthItem()
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
						pt={12}
						flex={'1 0 20%'}
						borderRight={`1px solid ${disabledColor}`}
					>
						<CalendarSettingsPanel
							onChangeCurrent={calendar.onChangeCurrent}
							monthItem={checkMonthItemSettingsPanel(calendar.current)}
							current={calendar.current}
							onSelectDate={(data) => calendar.onChangeCurrent(data.value, 'day')}
							onAddTask={calendar.onAddTask}
						/>
					</FlexBlock>
					<FlexBlock flex={'1 0 80%'} pr={24} height={'100%'} additionalCss={css`z-index: 0`}>
						{layout === 'favorites' ? (
							<Interceptor shouldRenderChildren={calendar.current.layout === 'favorites'}>
								<React.Suspense fallback={<Loader title={'Загружаем избранные, секундочку...'} isActive={true}/>}>
									<FavoritesCalendar
										current={calendar.current as CalendarCurrentFavorites}
										onSelectTask={calendar.onSelectTask}
									/>
								</React.Suspense>
							</Interceptor>
						) : layout === 'list' ? (
							<Interceptor shouldRenderChildren={calendar.current.layout === 'list'}>
								<React.Suspense fallback={<Loader title={'Загружаем ваш календарь, секундочку...'} isActive={true}/>}>
									<ListCalendar
										current={calendar.current as CalendarCurrentList}
										onSelectTask={calendar.onSelectTask}
									/>
								</React.Suspense>
							</Interceptor>
						) : layout === 'year' ? (
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
							path={'calendar'}
						>
							<Route
								index
								element={<ChangeCalendarModal onClose={calendar.onCloseAddCalendarModal}/>}
							/>
							<Route
								path={':calendarId'}
								element={<ChangeCalendarHock onClose={calendar.onCloseAddCalendarModal}/>}
							/>
						</Route>
						<Route
							path={'add'}
							element={
								<AddTaskModal
									date={calendar.addTaskDate}
									onClose={calendar.onCloseAddTaskModal}
									clonedEventInfo={calendar.clonedEventInfo}
									onSuccessClonedEvent={calendar.onSuccessClonedEvent}
									onComplete={calendar.onSelectTask}
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
