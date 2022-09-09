import {FC, useCallback, useMemo} from "react";
import dayjs from "dayjs";
import {Tooltip} from "../../Tooltip/Tooltip";
import {PourDatesProps, SmallMonthProps} from "./SmallMonth";
import {WeekItem} from "../types";
import {GetTaskSchemeResponse} from "../../../store/api/taskApi/taskApi";
import {SmallMonthRow, SmallMonthWeekCount} from "./SmallMonth.styled";
import {SmallMonthDateItem} from "./SmallMonthDateItem";

export interface SmallMonthWeekItemProps extends Pick<SmallMonthProps, 'onSelectWeek' | 'onSelectDate' | 'useTooltips'> {
	pourDates?: PourDatesProps,
	weekItem: WeekItem,
	currentDate?: Date,
	taskScheme?: GetTaskSchemeResponse,
}


const checkIsPouredWeek = (weekItem: WeekItem, pourDate: PourDatesProps) => {
	const date = dayjs(pourDate.date)
	return date.week() === weekItem.weekOfYear && date.year() === weekItem.year
}

export interface CheckPourMonthResult {
	firstPour: Date,
	lastPour: Date
}

const checkPourMonth = (pourDate: PourDatesProps): CheckPourMonthResult | null => {
	if (pourDate.type === 'month') {
		const date = dayjs(pourDate.date)
		
		return {
			firstPour: date.startOf('month').toDate(),
			lastPour: date.endOf('month').toDate()
		}
	}
	
	return null
}

export const SmallMonthWeekItem: FC<SmallMonthWeekItemProps> = ({
																													 pourDates,
																													 weekItem,
																													 currentDate,
																													 taskScheme,
																													 onSelectWeek,
																													 onSelectDate,
																													 useTooltips
																												 }) => {
	const weekIsPoured = useMemo(() => {
		return pourDates?.type === 'week' && checkIsPouredWeek(weekItem, pourDates)
	}, [weekItem, pourDates])
	
	const selectWeekHandle = useCallback(() => {
		onSelectWeek && onSelectWeek({
			layout: 'week',
			aroundDate: weekItem.days[0].value
		})
	}, [weekItem, onSelectWeek])
	
	return (
		<SmallMonthRow
			isPoured={weekIsPoured}
		>
			<SmallMonthWeekCount
				onClick={selectWeekHandle}
			>
				{weekItem.weekOfYear}
			</SmallMonthWeekCount>
			{weekItem.days.map((day, index) => {
					const isSelect = currentDate && dayjs(currentDate).isSame(day.value, 'date')
					
					if (useTooltips && (day.meta.isToday || isSelect)) {
						return (
							<Tooltip
								text={day.meta.isToday ? 'Сегодня' : 'Выбранный день календаря'}
								key={`short-date-${day.value.toString()}`}
								placement={'right'}
							>
								<SmallMonthDateItem
									date={day}
									currentDate={currentDate}
									taskScheme={taskScheme}
									onSelectDate={onSelectDate}
									pour={pourDates?.type === 'month' ? checkPourMonth(pourDates) : null}
									isSelect={isSelect}
								/>
							</Tooltip>
						)
					}
					
					return (
						<SmallMonthDateItem
							key={`short-date-${day.value.getDate()}`}
							date={day}
							currentDate={currentDate}
							taskScheme={taskScheme}
							onSelectDate={onSelectDate}
							pour={pourDates?.type === 'month' ? checkPourMonth(pourDates) : null}
							isSelect={isSelect}
						/>
					)
				}
			)}
		</SmallMonthRow>
	)
}