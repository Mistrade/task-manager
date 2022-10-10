import {WeekCalendarProps} from "../types";
import {FC, useMemo} from "react";
import {WeeKCalendar} from "./WeekCalendar";
import {getTaskSchemeScope} from "../../../common/calendarSupport/scopes";
import {useGetTaskCountOfStatusQuery, useGetTasksAtScopeQuery} from "../../../store/api/taskApi/taskApi";
import dayjs from "dayjs";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {EventFilter} from "../DayCalendar/EventFilter";
import {useEventFilters} from "../../../hooks/useEventFilters";

export interface WeekCalendarControllerProps extends Omit<WeekCalendarProps, 'taskStorage'> {

}

export const WeekCalendarController: FC<WeekCalendarControllerProps> = (props) => {
	const scope = useMemo(() => {
		const {weekItem} = props
		
		const start = dayjs(weekItem.days[0].value).startOf('date')
		const end = dayjs(weekItem.days[weekItem.days.length - 1].value).endOf('date')
		return {
			fromDate: start.toString(),
			toDate: end.toString()
		}
	}, [props.weekItem.weekOfYear])
	
	const {filters, setFiltersState, handlers, debounceValue} = useEventFilters({
		initialValues: {
			title: null,
			taskStatus: 'in_work',
			start: dayjs(scope.fromDate).toDate(),
			end: dayjs(scope.toDate).toDate(),
			priority: null,
		}
	})
	
	const queryArgs = useMemo(() => {
		return {
			title: debounceValue.title,
			fromDate: debounceValue.start.toString(),
			toDate: debounceValue.end.toString(),
			priority: debounceValue.priority,
		}
	}, [debounceValue])
	
	const {data} = useGetTasksAtScopeQuery({
		...queryArgs,
		taskStatus: debounceValue.taskStatus
	})
	
	const {data: SwitcherBadges} = useGetTaskCountOfStatusQuery(queryArgs)
	
	return (
		<FlexBlock mt={16} mb={16} height={'100%'} width={'100%'} direction={'column'}>
			<FlexBlock width={'100%'} mb={8}>
				<EventFilter
					statusBadges={SwitcherBadges}
					values={filters}
					onChangeHandlers={handlers}
				/>
			</FlexBlock>
			<WeeKCalendar
				taskStorage={data || {}}
				{...props}
			/>
		</FlexBlock>
	)
}