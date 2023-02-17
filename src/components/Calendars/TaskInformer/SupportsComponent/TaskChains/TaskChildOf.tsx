import {FC} from "react";
import {TaskChainItem} from "./TaskChainItem";
import {TaskInformerUpdateFn} from "../ToggleTaskInformerButtons";
import {TaskChainTitle} from "./TaskChainTitle";
import {css, keyframes} from "styled-components";
import {TaskChainItemsWrapper} from "./TaskChainItemsWrapper";
import {useBoolean} from "../../../../../hooks/useBoolean";
import {useCalendar} from "../../../../../hooks/useCalendar";
import {FullResponseEventModel} from "../../../../../store/api/taskApi/types";

interface TaskChildOfProps {
	taskInfo: FullResponseEventModel,
	updateFn: TaskInformerUpdateFn,
	title: string,
	childOfList: Array<FullResponseEventModel> | null | undefined
}

const startAnimation = keyframes`
  from {
    height: fit-content;
  }
  to {
    height: 0px;
  }

`

const listAnimation = (isWrap: boolean) => {
	return css`
    & {
      animation: ${startAnimation} .45s ease-in forwards ${!isWrap ? 'reverse' : ''};
    }
	`
}

export const TaskChildOf: FC<TaskChildOfProps> = ({taskInfo, updateFn, title, childOfList}) => {
	const {state, toggleState} = useBoolean(true)
	const {onCloneEvent} = useCalendar()
	
	
	if (childOfList && childOfList.length > 0) {
		return (
			<TaskChainTitle
				titleBadge={childOfList.length}
				title={title}
				isWrap={state}
				onClickOnAction={() => {
					onCloneEvent
					&& onCloneEvent({
						calendar: taskInfo.calendar,
						title: `ChildOf - `,
						parentId: taskInfo.id,
					})
				}}
				onWrapTitle={toggleState}
				content={
					<TaskChainItemsWrapper wrapState={state}>
						{childOfList
							.map(
								(item) => <TaskChainItem key={item.id} suffix={'parentOf'} taskChainItem={item} updateFn={updateFn}/>
							)}
					</TaskChainItemsWrapper>
				}
			/>
		)
	}
	
	return <></>
}