import {UsageTaskItemBaseProps} from "../../types";
import {TaskInformerUpdateFn} from "../SupportsComponent/ToggleTaskInformerButtons";
import {FC, useEffect, useState} from "react";
import {
	isCorrectTaskInformerSwitcherName,
	TaskInformerSwitchers,
	TaskInformerSwitchersKeys
} from "../SupportsComponent/TaskInformerSwitchers";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {disabledColor} from "../../../../common/constants";
import {TaskInformerLinkButton} from "../SupportsComponent/TaskInformerLinkButton";
import {TaskInformerAboutTab} from "../SupportsComponent/TaskInformerAboutTab";
import {TaskInformerTitle} from "../SupportsComponent/TaskInformerTitle";
import {TaskChainsTab} from "../SupportsComponent/TaskChains/TaskChainsTab";
import {TaskHistory} from "../SupportsComponent/TaskHistory/TaskHistory";
import {TaskMembers} from "../SupportsComponent/TaskMembers/TaskMembers";
import {useParams} from "react-router";
import {useAppSelector} from "../../../../store/hooks/hooks";
import {CalendarSelectors} from "../../../../store/selectors/calendarItems";
import {useSearchNavigate} from "../../../../hooks/useSearchNavigate";

interface TaskInformerLeftBarProps extends UsageTaskItemBaseProps {
	updateFn: TaskInformerUpdateFn
}

export const TaskInformerLeftBar: FC<TaskInformerLeftBarProps> = ({taskItem, updateFn}) => {
	const {tabName} = useParams<{ tabName?: TaskInformerSwitchersKeys }>()
	const [switcher, setSwitcher] = useState<TaskInformerSwitchersKeys>(tabName && isCorrectTaskInformerSwitcherName(tabName) ? tabName : 'about')
	const {current, statuses} = useAppSelector(CalendarSelectors.dataForURL)
	const navigate = useSearchNavigate()
	
	useEffect(() => {
		const path = `/calendar/${current.layout}/${statuses}/${taskItem.id}`
		if (!tabName || !isCorrectTaskInformerSwitcherName(tabName)) {
			return navigate(path + '/about', {replace: true})
		}
		
		if (tabName !== switcher) {
			return navigate(path + '/' + switcher, {replace: true})
		}
	}, [tabName, switcher])
	
	
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
			<FlexBlock gap={12} direction={'column'}>
				<TaskInformerTitle
					title={taskItem.title}
					onChange={async (value) => await updateFn('title', value)}
					isLiked={taskItem.isLiked}
					onChangeLiked={async (value) => await updateFn('isLiked', value)}
				/>
				<TaskInformerLinkButton
					link={taskItem.link}
					updateFn={updateFn}
				/>
				<TaskInformerSwitchers
					selected={switcher}
					onChange={(value) => setSwitcher(value.key)}
				/>
			</FlexBlock>
			<FlexBlock
				direction={'column'}
				height={'100%'}
				overflowY={'auto'}
				overflowX={"hidden"}
				pr={12}
			>
				{switcher === 'about' ? (
					<TaskInformerAboutTab taskItem={taskItem} updateFn={updateFn}/>
				) : switcher === 'chains' ? (
					<TaskChainsTab
						taskItem={taskItem}
						updateFn={updateFn}
						chains={{
							clonedBy: taskItem.linkedFrom,
							parentId: taskItem.parentId,
							childOf: taskItem.childOf
						}}
					/>
				) : switcher === 'history' ? (
					<TaskHistory taskInfo={taskItem}/>
				) : switcher === 'members' ? (
					<TaskMembers taskItem={taskItem}/>
				) : (<>{switcher}</>)}
			</FlexBlock>
		</FlexBlock>
	)
}
