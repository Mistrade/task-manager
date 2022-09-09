import {CalendarCurrentWeek, MonthItem, OnSelectDateFromCalendarFn} from "../types";
import {FC, ReactNode} from "react";
import {GetTaskSchemeResponse} from "../../../store/api/taskApi/taskApi";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {defaultColor, MonthList, WeekDaysShortList} from "../../../common/constants";
import {SmallMonthWeekItem} from "./SmallMonthWeekItem";
import {SmallMonthRow} from "./SmallMonth.styled";

export interface PourDatesProps {
	type: 'week' | 'month'
	date: Date,
}

export interface SmallMonthProps {
	currentDate?: Date,
	onSelectDate?: OnSelectDateFromCalendarFn,
	monthItem: MonthItem,
	title?: ReactNode,
	onSelectWeek?: (current: CalendarCurrentWeek) => void,
	includesTasks?: GetTaskSchemeResponse,
	pourDates?: PourDatesProps,
	useTooltips?: boolean
}

export const SmallMonth: FC<SmallMonthProps> = ({
																									onSelectDate,
																									monthItem,
																									currentDate,
																									includesTasks,
																									pourDates,
																									onSelectWeek,
																									title,
																									useTooltips,
																								}) => {
	return (
		<FlexBlock
			justify={'center'}
			align={'center'}
			style={{zIndex: 0}}
		>
			<FlexBlock direction={'column'} gap={4}>
				<FlexBlock>
					{title || (<h2>{MonthList[monthItem?.monthOfYear || 1]}</h2>)}
				</FlexBlock>
				<SmallMonthRow>
					<FlexBlock className={'row--item'}/>
					{WeekDaysShortList.map((item, index, arr) => (
						<FlexBlock
							className={'row--item'}
							key={`weekDay_${item}_short`}
							borderBottom={`1px solid ${defaultColor}`}
						>
							{item}
						</FlexBlock>
					))}
				</SmallMonthRow>
				{monthItem?.weeks.map((weekItem) => (
					<SmallMonthWeekItem
						useTooltips={useTooltips}
						key={`short-week-${weekItem.weekOfYear}`}
						onSelectWeek={onSelectWeek}
						onSelectDate={onSelectDate}
						weekItem={weekItem}
						pourDates={pourDates}
						currentDate={currentDate}
						taskScheme={includesTasks}
					/>
				))}
			</FlexBlock>
		</FlexBlock>
	)
}