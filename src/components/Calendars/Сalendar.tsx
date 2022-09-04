import {CalendarDisabledOptions, CalendarMode, CalendarProps, DateItem, MonthItem, WeekItem, YearItem} from './types'
import React, {FC, useEffect, useMemo, useState} from 'react'
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
	defaultYearItem, disabledColor,
	ERROR_TITLES,
	pageHeaderColor
} from '../../common/constants'
import {Interceptor} from './Interceptor'
import {useAppSelector} from '../../store/hooks/hooks'
import {ErrorBoundary} from "../Errors/ErrorBoundary";
import {Loader} from "../Loaders/Loader";
import {Route, Routes} from 'react-router-dom'
import {CalendarSettingsPanel} from "./DayCalendar/CalendarSettingsPanel";
import {dateToCalendarItem} from "../../common/calendarSupport/generators";
import {SmallMonth} from "./DatePicker/SmallMonthCalendar";
import {SmallCalendarMonthTitle} from "./DatePicker/SmallCalendarMonthTitle";
import dayjs from "dayjs";
import {getMonthDays} from "../../common/calendarSupport/getters";

const DayCalendar = React.lazy(() => import('./DayCalendar/DayCalendar').then(({DayCalendar}) => ({default: DayCalendar})))
const WeekCalendar = React.lazy(() => import('./WeekCalendar/WeekCalendar').then(({WeeKCalendar}) => ({default: WeeKCalendar})))
const MonthCalendar = React.lazy(() => import('./MonthCalendar/MonthCalendar').then(({MonthCalendar}) => ({default: MonthCalendar})))
const YearCalendar = React.lazy(() => import('./YearCalendar/YearCalendar').then(({YearCalendar}) => ({default: YearCalendar})))


interface Lay {
	layout: 'day' | 'week' | 'month' | 'year',
	date: Date,
}

export const Calendar: FC<CalendarProps> = ({
																							layout,
																							disabledOptions,
																							renderWeekPattern = 'full',
																							taskId
																						}) => {
	const calendar = useCalendar()
	
	const [yearItem, setYearItem] = useState<YearItem>(defaultYearItem)
	const [monthItem, setMonthItem] = useState<MonthItem>(defaultMonthItem)
	const [weekItem, setWeekItem] = useState<WeekItem>(defaultWeekItem)
	const [dateItem, setDateItem] = useState<DateItem>(defaultDateItem)
	
	const [lay, setLay] = useState()
	
	const taskStorage = useAppSelector(state => state.events.all)
	
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
					height={'calc(100% - 70px)'}
					direction={'row'}
					justify={'flex-start'}
					gap={24}
					align={'flex-start'}
				>
					<FlexBlock
						height={'100%'}
						grow={0}
						shrink={0}
						maxWidth={300}
						bgColor={pageHeaderColor}
						pr={24}
						pl={24}
						pt={24}
						flex={'1 0 20$'}
						borderRight={`1px solid ${disabledColor}`}
					>
						<CalendarSettingsPanel
							monthItem={checkMonthItemSettingsPanel(calendar.current)}
							current={calendar.current}
							onAddTask={calendar.onAddTask}
							onSelectDate={(data) => calendar.onChangeCurrent(data.value, 'day')}
						/>
					</FlexBlock>
					<FlexBlock flex={'1 0 80%'} pr={24}>
						{layout === 'year' ? (
							<Interceptor
								shouldRenderChildren={yearItem.year > 0 && yearItem.months.length > 0}
							>
								<React.Suspense fallback={<Loader title={'Загружаем ваш календарь, секундочку...'} isActive={true}/>}>
									<YearCalendar
										yearItem={yearItem}
										taskStorage={taskStorage}
										onChangeCurrent={calendar.onChangeCurrent}
									/>
								</React.Suspense>
							</Interceptor>
						) : layout === 'month' ? (
							<Interceptor
								shouldRenderChildren={monthItem.monthOfYear >= 0 && monthItem.weeks.length > 0}
							>
								<React.Suspense fallback={<Loader title={'Загружаем ваш календарь, секундочку...'} isActive={true}/>}>
									<MonthCalendar
										onChangeCurrent={calendar.onChangeCurrent}
										renderWeekPattern={renderWeekPattern}
										renderTaskCount={5}
										current={calendar.current}
										monthItem={monthItem}
										taskStorage={taskStorage}
										onAddTask={calendar.onAddTask}
										onSelectTask={calendar.onSelectTask}
									/>
								</React.Suspense>
							</Interceptor>
						) : layout === 'week' ? (
							<Interceptor
								shouldRenderChildren={weekItem.weekOfYear > 0 && weekItem.days.length > 0}
							>
								<FlexBlock pt={24} width={'100%'} height={'100%'}>
									<React.Suspense fallback={<Loader title={'Загружаем ваш календарь, секундочку...'} isActive={true}/>}>
										<WeekCalendar
											onChangeCurrent={calendar.onChangeCurrent}
											current={calendar.current}
											weekItem={weekItem}
											renderTaskCount={'all'}
											taskStorage={taskStorage}
											onAddTask={calendar.onAddTask}
											onSelectTask={calendar.onSelectTask}
										/>
									</React.Suspense>
								</FlexBlock>
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
					{/*<FlexBlock*/}
					{/*	position={'relative'}*/}
					{/*	pl={24}*/}
					{/*	pr={24}*/}
					{/*	height={`calc(100% - 70px)`}*/}
					{/*	width={'100%'}*/}
					{/*>*/}
					{/*	*/}
					{/*</FlexBlock>*/}
					<AddTaskModal
						date={calendar.addTaskDate}
						onClose={() => calendar.setAddTaskDate(null)}
					/>
					<Routes>
						<Route
							path={':taskId'}
							element={
								<TaskInfoModal
									onClose={() => calendar.onCloseTaskInfo()}
								/>
							}
						/>
					</Routes>
				</ErrorBoundary>
			</FlexBlock>
		</>
	)
}
