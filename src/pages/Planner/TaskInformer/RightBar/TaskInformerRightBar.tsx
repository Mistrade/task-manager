import {MonthItem, EventInfoBaseProps} from "../../planner.types";
import {
	EventInfoUpdateFn,
	ToggleEventCalendar,
	ToggleEventPriority,
	ToggleEventStatus
} from "../SupportsComponent/ToggleTaskInformerButtons";
import {FC} from "react";
import {FlexBlock} from "../../../../components/LayoutComponents/FlexBlock";
import {Heading} from "../../../../components/Text/Heading";
import {SmallMonth} from "../../SmallMotnCalendar/SmallMonth";
import {SmallCalendarMonthTitle} from "../../SmallMotnCalendar/SmallCalendarMonthTitle";
import dayjs from "dayjs";
import {TaskCreatedMessage} from "../TaskCreatedMessage";

interface TaskInformerRightBarProps extends EventInfoBaseProps {
	monthItem: MonthItem,
	updateFn: EventInfoUpdateFn,
}

export const TaskInformerRightBar: FC<TaskInformerRightBarProps> = ({
																																			eventInfo,
																																			monthItem,
																																		}) => {
	return (
		<FlexBlock
			flex={'0 0 300px'}
			width={'fit-content'}
			justify={'flex-start'}
			align={'flex-start'}
			direction={'column'}
			gap={12}
			pl={8}
		>
			<FlexBlock mb={6}>
				<Heading.H2 style={{textAlign: 'left', fontSize: 16}}>График месяца</Heading.H2>
			</FlexBlock>
			<SmallMonth
				title={<SmallCalendarMonthTitle monthItem={monthItem}/>}
				value={dayjs(eventInfo.time).toDate()}
				current={{
					layout: 'month',
					month: monthItem.monthOfYear,
					year: monthItem.year
				}}
				pourDates={{
					type: 'week',
					date: dayjs(eventInfo.time).toDate()
				}}
				monthItem={monthItem}
			/>
			<TaskCreatedMessage eventInfo={eventInfo}/>
		</FlexBlock>
	)
}