import {EventInfoBaseProps} from "../../planner.types";
import {
	EventInfoUpdateFn,
	ToggleEventCalendar,
	ToggleEventPriority, ToggleEventStatus
} from "../SupportsComponent/ToggleTaskInformerButtons";
import {FC, useEffect, useState} from "react";
import {
	isCorrectTaskInformerSwitcherName,
	TaskInformerSwitchers,
	TaskInformerSwitchersKeys
} from "../SupportsComponent/TaskInformerSwitchers";
import {FlexBlock} from "../../../../components/LayoutComponents/FlexBlock";
import {borderRadiusSize, disabledColor, pageHeaderColor} from "../../../../common/constants";
import {TaskInformerLinkButton} from "../SupportsComponent/TaskInformerLinkButton";
import {EventInfoAboutTab} from "./Tabs/About/EventInfoAboutTab";
import {TaskInformerTitle} from "../SupportsComponent/TaskInformerTitle";
import {EventChainsTab} from "./Tabs/Chains/EventChainsTab";
import {TaskHistory} from "./Tabs/TaskHistory/TaskHistory";
import {TaskMembers} from "./Tabs/TaskMembers/TaskMembers";
import {useParams} from "react-router";
import {useAppSelector} from "../../../../store/hooks/hooks";
import {CalendarSelectors} from "../../../../store/selectors/calendarItems";
import {useSearchNavigate} from "../../../../hooks/useSearchNavigate";
import {TaskComments} from "./Tabs/TaskComments/TaskComments";
import {Heading} from "../../../../components/Text/Heading";
import {Switcher} from "../../../../components/Switcher/Switcher";

interface TaskInformerLeftBarProps extends EventInfoBaseProps {
	updateFn: EventInfoUpdateFn,
	switcher: TaskInformerSwitchersKeys
}

export const TaskInformerLeftBar: FC<TaskInformerLeftBarProps> = ({eventInfo, updateFn, switcher}) => {
	return (
		<FlexBlock
			flex={'1 0 calc(100% - 312px)'}
			borderRight={`1px solid ${disabledColor}`}
			pr={20}
			direction={'column'}
			height={'100%'}
			justify={'flex-start'}
			gap={12}
		>
			<FlexBlock
				height={'100%'}
				// overflow={'hidden'}
				mt={4}
			>
				<FlexBlock
					width={'100%'}
					height={'100%'}
					direction={'column'}
				>
					{switcher === 'about' ? (
						<EventInfoAboutTab
							eventInfo={eventInfo}
							updateFn={updateFn}
						/>
					) : switcher === 'chains' ? (
						<EventChainsTab
							taskItem={eventInfo}
							updateFn={updateFn}
						/>
					) : switcher === 'history' ? (
						<TaskHistory taskInfo={eventInfo}/>
					) : switcher === 'members' ? (
						<TaskMembers taskItem={eventInfo}/>
					) : switcher === 'comments' ? (
						<TaskComments taskInfo={eventInfo}/>
					) : (
						<>{switcher}</>
					)}
				</FlexBlock>
			</FlexBlock>
		</FlexBlock>
	)
}
