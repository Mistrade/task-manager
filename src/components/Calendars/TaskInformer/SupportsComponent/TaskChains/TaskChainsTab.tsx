import {FC, useMemo} from "react";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {UUID} from "../../../types";
import {TaskClonedBy} from "./ClonedBy";
import {TaskInformerUpdateFn} from "../ToggleTaskInformerButtons";

interface ChainsObject {
	clonedBy?: UUID,
	parentId?: UUID,
}

interface TaskChainsTabProps {
	chains: ChainsObject,
	updateFn: TaskInformerUpdateFn
}

export const TaskChainsTab: FC<TaskChainsTabProps> = ({chains, updateFn}) => {
	const hasChains = useMemo(() => {
		return !!Object.keys(chains).filter((item) => !!item).length
	}, [chains])
	
	
	return (
		<FlexBlock width={'100%'}>
			{hasChains ? (
				<>
					{chains.clonedBy && <TaskClonedBy fromTaskId={chains.clonedBy} updateFn={updateFn} title={'Клонировано от:'}/>}
					{chains.parentId && <TaskClonedBy fromTaskId={chains.parentId} updateFn={updateFn} title={'Дочерняя для:'}/>}
				</>
			) : (
				<>
					Связи по этому событию не найдены
				</>
			)}
		</FlexBlock>
	)
}