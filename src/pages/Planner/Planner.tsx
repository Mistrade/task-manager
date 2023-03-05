import {
	PlannerFavoritesMode,
	PlannerListMode,
	CalendarDisabledOptions,
	PlannerMode,
	CalendarProps,
	DateItem,
	MonthItem,
	WeekItem,
	YearItem
} from './planner.types'
import React, {FC, useEffect, useState} from 'react'
import {usePlanner} from '../../hooks/usePlanner'
import {PlannerHeader} from './Header/PlannerHeader'
import {TaskInfoModal} from './CalendarModals/TaskInfoModal'
import {CreateEventModal} from './Forms/CreateEvent/CreateEventModal'
import {FlexBlock} from '../../components/LayoutComponents/FlexBlock'
import {
	defaultDateItem,
	defaultMonthItem,
	defaultWeekItem,
	defaultYearItem,
	disabledColor,
	ERROR_TITLES,
	pageHeaderColor
} from '../../common/constants'
import {Interceptor} from './Interceptor/Interceptor'
import {ErrorBoundary} from "../../components/Errors/ErrorBoundary";
import {Loader} from "../../components/Loaders/Loader";
import {Route, Routes} from 'react-router-dom'
import {PlannerOptionsPanel} from "./OptionsPanel/PlannerOptionsPanel";
import {CreateOrUpdateGroupModal} from "./Groups/CreateOrUpdateGroup";
import {RemoveGroupHock} from "./Groups/RemoveGroupModal";
import {css} from "styled-components";
import {UpdateGroupInfoHock} from "./Groups/UpdateGroupInfoHock";
import {DateListGenerator} from "../../common/calendarSupport/generators";
import {PlannerObserver} from "../../common/calendarSupport/observer";

const DayCalendar = React.lazy(() => import('./RenderModes/DayCalendar/DayCalendar').then(({DayCalendar}) => ({default: DayCalendar})))
const WeekCalendar = React.lazy(() => import('./RenderModes/WeekCalendar/WeekCalendarController').then(({WeekCalendarController}) => ({default: WeekCalendarController})))
const MonthCalendar = React.lazy(() => import('./RenderModes/MonthCalendar/MonthCalendar').then(({MonthCalendar}) => ({default: MonthCalendar})))
const YearCalendar = React.lazy(() => import('./RenderModes/YearCalendar/YearCalendar').then(({YearCalendar}) => ({default: YearCalendar})))
const ListCalendar = React.lazy(() => import('./RenderModes/List/ListCalendarMode').then(({ListCalendarMode}) => ({default: ListCalendarMode})))
const FavoritesCalendar = React.lazy(() => import('./RenderModes/FavoritesCalendar/FavoritesCalendar').then(({FavoritesCalendar}) => ({default: FavoritesCalendar})))

export const PlannerPage: FC<CalendarProps> = ({
																								 layout,
																								 taskStatus,
																								 disabledOptions,
																								 renderWeekPattern = 'full',
																							 }) => {
	const calendar = usePlanner()
	
	const [yearItem, setYearItem] = useState<YearItem>(defaultYearItem)
	const [monthItem, setMonthItem] = useState<MonthItem>(defaultMonthItem)
	const [weekItem, setWeekItem] = useState<WeekItem>(defaultWeekItem)
	const [dateItem, setDateItem] = useState<DateItem>(defaultDateItem)
	
	useEffect(() => {
		changeCurrentObserver(calendar.planner, disabledOptions)
	}, [calendar.planner, disabledOptions])
	
	const changeCurrentObserver = (current: PlannerMode, disabledOptions?: CalendarDisabledOptions) => {
		const {layout} = current
		const observer = new PlannerObserver(disabledOptions)
		
		
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
	
	const checkMonthItemSettingsPanel = (current: PlannerMode): MonthItem => {
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
			<PlannerHeader/>
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
					<PlannerOptionsPanel
						onChangeCurrent={calendar.onChangePlanner}
						monthItem={checkMonthItemSettingsPanel(calendar.planner)}
						current={calendar.planner}
						onSelectDate={(data) => calendar.onChangePlanner(data.value, 'day')}
						onAddTask={calendar.onAddTask}
					/>
				</FlexBlock>
				<FlexBlock flex={'1 0 80%'} pr={24} height={'100%'}>
					{layout === 'favorites' ? (
						<Interceptor shouldRenderChildren={calendar.planner.layout === 'favorites'}>
							<React.Suspense fallback={<Loader title={'Загружаем избранные, секундочку...'} isActive={true}/>}>
								<FavoritesCalendar
									current={calendar.planner as PlannerFavoritesMode}
									onSelectTask={calendar.onSelectTask}
								/>
							</React.Suspense>
						</Interceptor>
					) : layout === 'list' ? (
						<Interceptor shouldRenderChildren={calendar.planner.layout === 'list'}>
							<React.Suspense fallback={<Loader title={'Загружаем ваш календарь, секундочку...'} isActive={true}/>}>
								<ListCalendar
									current={calendar.planner as PlannerListMode}
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
									onChangeCurrent={calendar.onChangePlanner}
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
									onChangeCurrent={calendar.onChangePlanner}
									renderWeekPattern={renderWeekPattern}
									renderTaskCount={5}
									current={calendar.planner}
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
									onChangeCurrent={calendar.onChangePlanner}
									current={calendar.planner}
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
				<RemoveGroupHock
					groupInfo={calendar.groupRemoved}
					onClose={() => calendar.onSelectRemovedGroup(null)}
					onSuccess={() => calendar.onSelectRemovedGroup(null)}
				/>
				<Routes>
					<Route path={'group'}>
						<Route
							path={':groupId'}
							element={<UpdateGroupInfoHock onClose={calendar.onCloseCreateGroupModal}/>}
						/>
					</Route>
					<Route
						path={'create-group'}
						element={<CreateOrUpdateGroupModal onClose={calendar.onCloseCreateGroupModal}/>}
					/>
					<Route
						path={'add'}
						element={
							<CreateEventModal
								date={calendar.createEventDateState}
								onClose={calendar.onCloseCreateEventModal}
								clonedEventInfo={calendar.clonedEventInfo}
								onSuccessClonedEvent={calendar.onSuccessClonedEvent}
								onComplete={calendar.onSelectTask}
							/>
						}
					/>
					<Route path={':taskId'}>
						<Route
							index
							element={
								<TaskInfoModal
									onClose={calendar.onCloseEventInformer}
									onCloneEvent={calendar.onCloneEvent}
									onOpenClonedEvent={calendar.onSelectTask}
								/>
							}
						/>
						<Route
							path={':tabName'}
							element={
								<TaskInfoModal
									onClose={calendar.onCloseEventInformer}
									onCloneEvent={calendar.onCloneEvent}
									onOpenClonedEvent={calendar.onSelectTask}
								/>
							}
						/>
					</Route>
				</Routes>
			</ErrorBoundary>
		</FlexBlock>
	)
}
