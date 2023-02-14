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
		return !!Object.keys(chains).filter((item) => !!item).length || chains.childOf.length > 0
	}, [chains])
	
	
	return (
		<FlexBlock direction={'column'} gap={12} justify={'flex-start'} align={'flex-start'}>
			{hasChains ? (
				<>
					{chains.childOf && <TaskChildOf taskInfo={taskItem} updateFn={updateFn} title={'Вложенные:'} />}
					{chains.parentId && <TaskClonedBy fromTaskId={chains.parentId} updateFn={updateFn} title={'Вложено в:'} suffix={'childOf'}/>}
					{chains.clonedBy && <TaskClonedBy fromTaskId={chains.clonedBy} updateFn={updateFn} title={'Клонировано от:'} suffix={'cloneOf'}/>}
				</>
			) : "Связи не найдены"}
		</FlexBlock>
	)
}