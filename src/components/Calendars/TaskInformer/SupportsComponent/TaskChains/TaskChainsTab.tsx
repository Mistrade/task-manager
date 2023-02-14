import {FC, useMemo} from "react";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {UUID} from "../../../types";
import {TaskClonedBy} from "./ClonedBy";
import {TaskInformerUpdateFn} from "../ToggleTaskInformerButtons";
import {FullResponseEventModel} from "../../../../../store/api/taskApi/types";
import { TaskChildOf } from "./TaskChildOf";

interface ChainsObject {
	clonedBy?: UUID,
	parentId?: UUID,
	childOf: FullResponseEventModel["childOf"]
}

interface TaskChainsTabProps {
	taskItem: FullResponseEventModel,
	chains: ChainsObject,
	updateFn: TaskInformerUpdateFn
}

export const TaskChainsTab: FC<TaskChainsTabProps> = ({taskItem, chains, updateFn}) => {
	const hasChains = useMemo(() => {
		return !!Object.keys(chains).filter((item) => !!item).length
	}, [chains])
	
	
	return (
		<FlexBlock width={'100%'}>
			{hasChains ? (
				<>
					{chains.childOf && <TaskChildOf taskId={taskItem.id} updateFn={updateFn} />}
					{chains.clonedBy && <TaskClonedBy fromTaskId={chains.clonedBy} updateFn={updateFn} title={'Клонировано от:'} suffix={'cloneOf'}/>}
					{chains.parentId && <TaskClonedBy fromTaskId={chains.parentId} updateFn={updateFn} title={'Дочерняя для:'} suffix={'childOf'}/>}
				</>
			) : (
				<>
					Связи по этому событию не найдены
				</>
			)}
		</FlexBlock>
	)
}