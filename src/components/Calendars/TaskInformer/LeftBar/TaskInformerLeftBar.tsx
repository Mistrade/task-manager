import {UsageTaskItemBaseProps} from "../../types";
import {TaskInformerUpdateFn} from "../SupportsComponent/ToggleTaskInformerButtons";
import {FC, useState} from "react";
import {TaskInformerSwitchers, TaskInformerSwitchersKeys} from "../SupportsComponent/TaskInformerSwitchers";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {disabledColor} from "../../../../common/constants";
import {TaskInformerLinkButton} from "../SupportsComponent/TaskInformerLinkButton";
import {TaskInformerAboutTab} from "../SupportsComponent/TaskInformerAboutTab";
import {TaskInformerTitle} from "../SupportsComponent/TaskInformerTitle";
import {TaskChainsTab} from "../SupportsComponent/TaskChains/TaskChainsTab";
import {TaskHistory} from "../SupportsComponent/TaskHistory/TaskHistory";
import {TaskMembers} from "../SupportsComponent/TaskMembers/TaskMembers";

interface TaskInformerLeftBarProps extends UsageTaskItemBaseProps {
	updateFn: TaskInformerUpdateFn
}

export const TaskInformerLeftBar: FC<TaskInformerLeftBarProps> = ({taskItem, updateFn}) => {
	const [switcher, setSwitcher] = useState<TaskInformerSwitchersKeys>('about')
	
	return (
		<FlexBlock
			flex={'1 0 calc(100% - 312px)'}
			borderRight={`1px solid ${disabledColor}`}
			pr={20}
			direction={'column'}
			maxHeight={'100vh'}
			justify={'flex-start'}
			gap={12}
		>
			<FlexBlock minHeight={'10vh'} maxHeight={'30vh'} gap={12} direction={'column'}>
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
				height={'60vh'}
				overflowY={'auto'}
				overflowX={"hidden"}
				className={'123'}
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