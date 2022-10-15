import React, {FC, useCallback, useMemo} from 'react'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {DaySettingsPanelProps} from '../types'
import {css} from 'styled-components'
import {Button} from '../../Buttons/Buttons.styled'
import {SmallCalendarMonthTitle} from '../SmallMotnCalendar/SmallCalendarMonthTitle'
import dayjs from 'dayjs'
import {Tooltip} from '../../Tooltip/Tooltip'
import {GetTaskSchemeRequest, useGetTaskSchemeQuery} from "../../../store/api/taskApi/taskApi";
import {getTaskSchemeScope} from "../../../common/calendarSupport/scopes";
import {CalendarList} from "../CalendarList/CalendarList";
import {PourDatesProps, SmallMonth} from "../SmallMotnCalendar/SmallMonth";
import {CalendarTodaySwitchers} from "../Header/CalendarTodaySwitchers";
import {ShortChangeCurrentPattern} from "../../../common/commonTypes";
import {changeCurrentModeHandler} from "../../../common/functions";


export const CalendarSettingsPanel: FC<DaySettingsPanelProps> = ({
																																	 onSelectDate,
																																	 current,
																																	 monthItem,
																																	 onChangeCurrent
																																 }) => {
	
	const datesForScheme: GetTaskSchemeRequest = useMemo(() => {
		const {monthOfYear, year} = monthItem
		const d = dayjs().set('year', year).set('month', monthOfYear).toDate()
		return getTaskSchemeScope(d, 'month', false)
	}, [monthItem.monthOfYear])
	
	const {
		data: taskScheme,
		isLoading: isLoadingTaskScheme,
		isFetching: isFetchingTaskScheme,
		refetch: refetchTaskScheme,
		isError
	} = useGetTaskSchemeQuery(datesForScheme, {refetchOnMountOrArgChange: true})
	
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
	
	return (
		<FlexBlock
			direction={'column'}
			grow={0}
			align={'flex-start'}
			position={'relative'}
		>
			<FlexBlock pl={24} mb={24}>
			<CalendarTodaySwitchers
				onChange={onChangeCurrentHandler}
			/>
			</FlexBlock>
			<FlexBlock minHeight={200} mb={24} style={{zIndex: 1}}>
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
					text={`Рассчитано на основе текущего часового пояса: UTC${dayjs().utcOffset() >= 0 ? `+${dayjs().utcOffset() / 60}` : `-${dayjs().utcOffset() / 60}`}`}
					placement={'right'}
					children={`Часовой пояс:\n${dayjs.tz.guess()}`}
				/>
			</FlexBlock>
			<FlexBlock width={'100%'}>
				<CalendarList/>
			</FlexBlock>
		</FlexBlock>
	)
}
