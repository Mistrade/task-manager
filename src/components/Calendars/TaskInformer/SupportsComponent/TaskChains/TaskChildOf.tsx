import {UUID} from "../../../types";
import {FC, useEffect, useRef, useState} from "react";
import {useGetChildOfListQuery} from "../../../../../store/api/taskApi/taskApi";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {currentColor, disabledColor} from "../../../../../common/constants";
import {Loader} from "../../../../Loaders/Loader";
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

export const TaskChildOf: FC<TaskChildOfProps> = ({taskInfo, updateFn, title}) => {
	const {
		data: childOfList,
		isFetching,
		isError,
		isSuccess
	} = useGetChildOfListQuery(taskInfo.id, {refetchOnMountOrArgChange: true})
	const {state, toggleState} = useBoolean(true)
	const {onCloneEvent} = useCalendar()
	
	
	if (childOfList?.data && childOfList.data.length > 0) {
		return (
			<TaskChainTitle
				titleBadge={childOfList?.data.length}
				title={title}
				isWrap={state}
				onClickOnAction={() => {
					onCloneEvent && onCloneEvent({
						calendar: taskInfo.calendar,
						title: `ChildOf - `,
						parentId: taskInfo.id,
					})
				}}
				onWrapTitle={toggleState}
				content={
					<TaskChainItemsWrapper wrapState={state}>
						{childOfList
						.data
						.map(
							(item) => <TaskChainItem suffix={'parentOf'} taskChainItem={item} updateFn={updateFn}/>
						)}
					</TaskChainItemsWrapper>
				}
			/>
		)
	}
	
	return <></>
}