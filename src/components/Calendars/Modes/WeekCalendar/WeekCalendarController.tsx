import {WeekCalendarProps, WeekItem} from "../../types";
import React, {FC, useMemo} from "react";
import {WeeKCalendar} from "./WeekCalendar";
import {useGetTaskCountOfStatusQuery, useGetTasksAtScopeQuery} from "../../../../store/api/taskApi/taskApi";
import dayjs from "dayjs";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {EventFilter} from "../DayCalendar/EventFilter";
import {useEventFilters} from "../../../../hooks/useEventFilters";
import {useAppSelector} from "../../../../store/hooks/hooks";
import {WeekDays} from "./WeekDays/WeekDays";
import {WeekDaysList} from "../../../../common/constants";
import {useTaskStorageQueryArgs} from "../../../../hooks/useTaskStorageScope";

export interface WeekCalendarControllerProps extends Omit<WeekCalendarProps, 'taskStorage'> {

}

interface Scope {
	start: Date,
	end: Date,
}

function getScope(weekItem: WeekItem): Scope {
	const start = dayjs(weekItem.days[0].value).startOf('date')
	const end = dayjs(weekItem.days[weekItem.days.length - 1].value).endOf('date')
	
	return {
		start: start.toDate(),
		end: end.toDate(),
	}
}

export const WeekCalendarController: FC<WeekCalendarControllerProps> = (props) => {
	const scope = useMemo(() => getScope(props.weekItem), [props.weekItem.weekOfYear, props.weekItem.month, props.weekItem.year])
	const {queryArgs, taskStatus, handlers, filters, TaskStorage, SwitcherBadges} = useTaskStorageQueryArgs({
		scope,
		layout: props.current.layout
	})
	
	return (
		<FlexBlock mt={16} mb={16} height={'100%'} width={'100%'} direction={'column'}>
			<FlexBlock width={'100%'} mb={8}>
				<EventFilter
					statusBadges={SwitcherBadges}
					values={filters}
					onChangeHandlers={handlers}
				/>
			</FlexBlock>
			<FlexBlock width={'100%'} mb={6} pt={6}>
				<WeekDays list={WeekDaysList} gap={4}/>
			</FlexBlock>
			<WeeKCalendar
				taskStorage={TaskStorage || {}}
				{...props}
			/>
		</FlexBlock>
	)
}