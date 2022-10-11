import {MonthItem, UsageTaskItemBaseProps} from "../../types";
import {
	TaskInformerUpdateFn, ToggleEventCalendar,
	ToggleEventPriority,
	ToggleEventStatus
} from "../SupportsComponent/ToggleTaskInformerButtons";
import {FC} from "react";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {Heading} from "../../../Text/Heading";
import {SmallMonth} from "../../SmallMotnCalendar/SmallMonth";
import {SmallCalendarMonthTitle} from "../../SmallMotnCalendar/SmallCalendarMonthTitle";
import dayjs from "dayjs";
import {TaskCreatedMessage} from "../TaskCreatedMessage";
import {EmptyButtonStyled} from "../../../Buttons/EmptyButton.styled";

interface TaskInformerRightBarProps extends UsageTaskItemBaseProps {
	monthItem: MonthItem,
	updateFn: TaskInformerUpdateFn,
}

export const TaskInformerRightBar: FC<TaskInformerRightBarProps> = ({
																																			taskItem,
																																			monthItem,
																																			updateFn,
																																			openClonedTask
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
			<FlexBlock direction={'column'} align={'flex-start'} justify={'flex-start'} gap={12}>
				<FlexBlock>
					<Heading.H2 style={{textAlign: 'left', fontSize: 16}}>Доп инфо</Heading.H2>
				</FlexBlock>
				<ToggleEventStatus value={taskItem.status} onChange={updateFn}/>
				<ToggleEventPriority value={taskItem.priority} onChange={updateFn}/>
				<ToggleEventCalendar value={taskItem.calendar} renderText={true} onChange={updateFn}/>
			</FlexBlock>
			<FlexBlock mb={6} mt={6}>
				<Heading.H2 style={{textAlign: 'left', fontSize: 16}}>График месяца</Heading.H2>
			</FlexBlock>
			<SmallMonth
				title={<SmallCalendarMonthTitle monthItem={monthItem}/>}
				value={dayjs(taskItem.time).toDate()}
				current={{
					layout: 'month',
					month: monthItem.monthOfYear,
					year: monthItem.year
				}}
				pourDates={{
					type: 'week',
					date: dayjs(taskItem.time).toDate()
				}}
				monthItem={monthItem}
			/>
			<TaskCreatedMessage taskItem={taskItem}/>
			{taskItem.linkedFrom && (
				<FlexBlock>
					<EmptyButtonStyled
						onClick={() => {
							taskItem.linkedFrom && openClonedTask && openClonedTask(taskItem.linkedFrom)
						}}
					>
						Смотреть исходное событие
					</EmptyButtonStyled>
				</FlexBlock>
			)}
		</FlexBlock>
	)
}