import {CalendarDisabledOptions, CalendarMode, CalendarProps, DateItem, MonthItem, WeekItem, YearItem} from './types'
import React, {FC, useEffect, useState} from 'react'
import {CurrentObserver} from '../../common/functions'
import {useCalendar} from '../../hooks/useCalendar'
import {CalendarHeader} from './Header/CalendarHeader'
import {TaskInfoModal} from './CalendarModals/TaskInfoModal'
import {AddTaskModal} from './CalendarModals/AddTaskModal'
import {FlexBlock} from '../LayoutComponents/FlexBlock'
import {css} from 'styled-components'
import {defaultDateItem, defaultMonthItem, defaultWeekItem, defaultYearItem, ERROR_TITLES} from '../../common/constants'
import {Interceptor} from './Interceptor'
import {useAppSelector} from '../../store/hooks/hooks'
import {ErrorBoundary} from "../Errors/ErrorBoundary";
import {Loader} from "../Loaders/Loader";
import {Route, Routes} from 'react-router-dom'

const DayCalendar = React.lazy(() => import('./DayCalendar/DayCalendar').then(({DayCalendar}) => ({default: DayCalendar})))
const WeekCalendar = React.lazy(() => import('./WeekCalendar/WeekCalendar').then(({WeeKCalendar}) => ({default: WeeKCalendar})))
const MonthCalendar = React.lazy(() => import('./MonthCalendar/MonthCalendar').then(({MonthCalendar}) => ({default: MonthCalendar})))
const YearCalendar = React.lazy(() => import('./YearCalendar/YearCalendar').then(({YearCalendar}) => ({default: YearCalendar})))


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
	
	return (
		<>
			<FlexBlock
				position={'relative'}
				align={'flex-start'}
				direction={'column'}
				grow={3}
				width={'100%'}
				minHeight={800}
				maxHeight={'100vh'}
				additionalCss={css`
          & {
            padding: 0px;
          }
				`}
			>
				<ErrorBoundary
					title={ERROR_TITLES['CALENDAR_RENDER']}
					description={ERROR_TITLES['SUSPENSE']}
					errorType={'SYSTEM_ERROR'}
				>
					<FlexBlock
						position={'relative'}
						pl={24}
						pr={24}
						height={`100vh`}
						// overflow={'scroll'}
						width={'100%'}
					>
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
										onChangeCurrent={calendar.onChangeCurrent}
										taskStorage={taskStorage}
										renderTaskCount={'all'}
									/>
								</React.Suspense>
							</Interceptor>
						) : <></>}
					</FlexBlock>
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
