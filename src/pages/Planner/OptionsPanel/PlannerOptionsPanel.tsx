import React, {FC, useCallback, useMemo} from 'react'
import {FlexBlock} from '../../../components/LayoutComponents/FlexBlock'
import {DaySettingsPanelProps} from '../planner.types'
import {SmallCalendarMonthTitle} from '../SmallMotnCalendar/SmallCalendarMonthTitle'
import dayjs from 'dayjs'
import {Tooltip} from '../../../components/Tooltip/Tooltip'
import {useGetEventsSchemeQuery} from "../../../store/api/planning-api";
import {DateScopeHelper} from "../../../common/calendarSupport/scopes";
import {GroupList} from "../Groups/GroupList";
import {PourDatesProps, SmallMonth} from "../SmallMotnCalendar/SmallMonth";
import {ShortChangeCurrentPattern} from "../../../common/commonTypes";
import {changeCurrentModeHandler, getCalendarTitle} from "../../../common/functions";
import {useAppSelector} from "../../../store/hooks/hooks";
import {CalendarCurrentTitle} from "../Header/CalendarCurrentTitle";
import {GetEventsFiltersRequestProps} from "../../../store/api/planning-api/types/event-info.types";
import {css} from "styled-components";


export const PlannerOptionsPanel: FC<DaySettingsPanelProps> = ({
																																 onSelectDate,
																																 current,
																																 monthItem,
																																 onChangeCurrent,
																																 onAddTask
																															 }) => {
	
	
	const datesForScheme: GetEventsFiltersRequestProps = useMemo(() => {
		return {
			...new DateScopeHelper({useOtherDays: true}).getDateScopeForTaskScheme(new Date(monthItem.year, monthItem.monthOfYear), 'month'),
			utcOffset: dayjs().utcOffset()
		}
	}, [monthItem.monthOfYear])
	
	const {statuses, dateOfCreateEvent} = useAppSelector(state => state.planner)
	
	const {
		data: taskScheme,
		isLoading: isLoadingTaskScheme,
		isFetching: isFetchingTaskScheme,
		refetch: refetchTaskScheme,
		isError
	} = useGetEventsSchemeQuery(datesForScheme, {
		refetchOnMountOrArgChange: true,
		skip: !dayjs(datesForScheme.fromDate).isValid() || !dayjs(datesForScheme.toDate).isValid()
	})
	
	const currentDate: Date = useMemo(() => {
		switch (current.layout) {
			case "day":
				return current.date || dayjs().toDate()
			case "week":
				const d = dayjs(current.aroundDate)
				
				if (d.startOf('week').month() !== d.endOf('week').month()) {
					return d.startOf('month').toDate()
				}
				
				return d.startOf('week').toDate()
			case "month":
				return dayjs().set('year', current.year).set('month', current.month).startOf('month').toDate()
			case "year":
				return dayjs().startOf('month').toDate()
			case "list":
				return current.fromDate
			case "favorites":
				return dayjs().toDate()
		}
	}, [current])
	
	const pour: PourDatesProps | undefined = useMemo(() => {
		if (current.layout === 'month') {
			const date = dayjs().set('year', current.year).set('month', current.month).startOf('month').toDate()
			return {
				type: current.layout,
				date
			}
		}
		
		if (current.layout === 'week') {
			return {
				type: 'week',
				date: current.aroundDate
			}
		}
		
		return undefined
	}, [current])
	
	const onChangeCurrentHandler = useCallback((pattern: ShortChangeCurrentPattern = 'today') => {
		onChangeCurrent && onChangeCurrent(changeCurrentModeHandler(current, pattern), current.layout)
	}, [current, onChangeCurrent])
	
	const title: string = useMemo(() => {
		return getCalendarTitle(current)
	}, [current])
	
	const addTaskHandler = useCallback(() => {
		if (current.layout !== 'day') {
			return onAddTask(new Date())
		}
		
		return onAddTask(current.date)
	}, [current, dateOfCreateEvent])
	
	return (
		<FlexBlock
			direction={'column'}
			grow={0}
			align={'flex-start'}
			position={'relative'}
			additionalCss={css`z-index: 0`}
		>
			<FlexBlock mb={24} width={'100%'} justify={'center'}>
				<CalendarCurrentTitle
					title={title}
					current={current}
					statuses={statuses}
					onAddTask={addTaskHandler}
					onChangeSwitcherState={onChangeCurrentHandler}
				/>
			</FlexBlock>
			<FlexBlock minHeight={200} mb={24}>
				<SmallMonth
					pourDates={pour}
					includesTasks={taskScheme}
					monthItem={monthItem}
					title={
						<SmallCalendarMonthTitle
							monthItem={monthItem}
						/>
					}
					current={{
						layout: "month",
						month: currentDate.getMonth(),
						year: currentDate.getFullYear()
					}}
					value={currentDate}
					onSelectDate={onSelectDate}
				/>
			</FlexBlock>
			<FlexBlock textAlign={'left'} mb={24} justify={'flex-end'} align={'flex-end'} width={'100%'}>
				<Tooltip
					content={`Рассчитано на основе текущего часового пояса: UTC${dayjs().utcOffset() >= 0 ? `+${dayjs().utcOffset() / 60}` : `-${dayjs().utcOffset() / 60}`}`}
					placement={'right'}
					children={`Часовой пояс:\n${dayjs.tz.guess()}`}
				/>
			</FlexBlock>
			<FlexBlock width={'100%'}>
				<GroupList/>
			</FlexBlock>
		</FlexBlock>
	)
}
