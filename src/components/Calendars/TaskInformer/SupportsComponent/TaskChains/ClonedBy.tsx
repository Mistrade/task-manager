import {FC} from "react";
import {TaskInformerUpdateFn} from "../ToggleTaskInformerButtons";
import {TaskChainItem} from "./TaskChainItem";
import {TaskChainTitle} from "./TaskChainTitle";
import {TaskChainItemsWrapper} from "./TaskChainItemsWrapper";
import {useBoolean} from "../../../../../hooks/useBoolean";
import {FullResponseEventModel} from "../../../../../store/api/taskApi/types";


export interface TaskClonedByProps {
	fromTask: FullResponseEventModel | null | undefined,
	updateFn: TaskInformerUpdateFn,
	title: string,
	suffix: string
}

export const TaskSingleChain: FC<TaskClonedByProps> = ({fromTask, updateFn, title, suffix}) => {
	const {state, toggleState} = useBoolean(true)
	
	if (fromTask) {
		return (
			<TaskChainTitle
				title={title}
				isWrap={state}
				onWrapTitle={toggleState}
				content={
					<TaskChainItemsWrapper wrapState={state}>
						<TaskChainItem taskChainItem={fromTask} suffix={suffix} updateFn={updateFn}/>
					</TaskChainItemsWrapper>
				}
			/>
		)
	}
	
	return <></>
}