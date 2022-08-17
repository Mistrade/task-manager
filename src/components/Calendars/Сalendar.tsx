import {CalendarDisabledOptions, CalendarMode, CalendarProps, DateItem, MonthItem, WeekItem, YearItem} from './types'
import React, {FC, useEffect, useState} from 'react'
import {CurrentObserver} from '../../common/functions'
import {useCalendar} from '../hooks/useCalendar'
import {CalendarHeader} from './Header/CalendarHeader'
import {TaskInfoModal} from './CalendarModals/TaskInfoModal'
import {AddTaskModal} from './CalendarModals/AddTaskModal'
import {FlexBlock} from '../LayoutComponents/FlexBlock'
import {css} from 'styled-components'
import {defaultDateItem, defaultMonthItem, defaultWeekItem, defaultYearItem, ERROR_TITLES} from '../../common/constants'
import {Interceptor} from './Interceptor'
import {useAppSelector} from '../../store/hooks/hooks'
import {ErrorBoundary} from "../Errors/ErrorBoundary";

const DayCalendar = React.lazy(() => import('./DayCalendar/DayCalendar').then(({DayCalendar}) => ({default: DayCalendar})))
const WeekCalendar = React.lazy(() => import('./WeekCalendar/WeekCalendar').then(({WeeKCalendar}) => ({default: WeeKCalendar})))
const MonthCalendar = React.lazy(() => import('./MonthCalendar/MonthCalendar').then(({MonthCalendar}) => ({default: MonthCalendar})))
const YearCalendar = React.lazy(() => import('./YearCalendar/YearCalendar').then(({YearCalendar}) => ({default: YearCalendar})))

export const Calendar: FC<CalendarProps> = ({
																							initialCurrent,
																							disabledOptions = {},
																							renderWeekPattern = 'full',
																						}) => {
	const calendar = useCalendar(initialCurrent)
	
	const [yearItem, setYearItem] = useState<YearItem>(defaultYearItem)
	const [monthItem, setMonthItem] = useState<MonthItem>(defaultMonthItem)
	const [weekItem, setWeekItem] = useState<WeekItem>(defaultWeekItem)
	const [dateItem, setDateItem] = useState<DateItem>(defaultDateItem)
	
	const taskStorage = useAppSelector(state => state.events.all)
	
	useEffect(() => {
		changeCurrentObserver(calendar.current, disabledOptions).then(r => r)
	}, [calendar.current, disabledOptions])
	
	const changeCurrentObserver = async (current: CalendarMode, disabledOptions?: CalendarDisabledOptions) => {
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
		<FlexBlock
			position={'relative'}
			align={'flex-start'}
			direction={'column'}
			grow={3}
			className={'Calendar__container'}
			width={'100%'}
			minHeight={800}
			maxHeight={'95vh'}
			additionalCss={css`
        & {
          padding: 24px 20px 0px 20px;
        }
			`}
		>
			<ErrorBoundary
				title={ERROR_TITLES['CALENDAR_RENDER']}
				description={ERROR_TITLES['SUSPENSE']}
				errorType={'SYSTEM_ERROR'}
			>
				
				<CalendarHeader
					current={calendar.current}
					onChangeCurrent={calendar.onChangeCurrent}
					renderWeekPattern={renderWeekPattern}
				/>
				<FlexBlock
					position={'relative'}
					mt={12}
					maxHeight={`calc(100vh-${calendar.current.layout === 'month' || calendar.current.layout === 'week' ? '150px' : '70px'})`}
					overflow={'scroll'}
					width={'100%'}
				>
					{calendar.current.layout === 'year' ? (
						<Interceptor
							shouldRenderChildren={yearItem.year > 0 && yearItem.months.length > 0}
						>
							<React.Suspense fallback={'Загрузка календаря...'}>
								<YearCalendar
									yearItem={yearItem}
									current={calendar.current}
									taskStorage={taskStorage}
									onChangeCurrent={calendar.onChangeCurrent}
								/>
							</React.Suspense>
						</Interceptor>
					) : calendar.current.layout === 'month' ? (
						<Interceptor
							shouldRenderChildren={monthItem.monthOfYear >= 0 && monthItem.weeks.length > 0}
						>
							<React.Suspense fallback={'Загрузка календаря...'}>
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
					) : calendar.current.layout === 'week' ? (
						<Interceptor
							shouldRenderChildren={weekItem.weekOfYear > 0 && weekItem.days.length > 0}
						>
							<React.Suspense fallback={'Загрузка календаря...'}>
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
						</Interceptor>
					) : calendar.current.layout === 'day' ? (
						<Interceptor
							shouldRenderChildren={dateItem.settingPanel.monthItem.weeks.length > 0}
						>
							<React.Suspense fallback={'Загрузка календаря...'}>
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
				<TaskInfoModal
					selectedTask={calendar.selectedTask}
					onClose={() => calendar.setSelectedTask(null)}
				/>
			</ErrorBoundary>
		</FlexBlock>
	)
}
