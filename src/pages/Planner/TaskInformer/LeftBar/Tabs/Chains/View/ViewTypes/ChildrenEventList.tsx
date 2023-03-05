import {FC} from "react";
import {TaskChainItem} from "../TaskChainItem";
import {ChainsAccordion} from "../ChainsAccordion";
import {TaskChainItemsWrapper} from "../TaskChainItemsWrapper";
import {useBoolean} from "../../../../../../../../hooks/useBoolean";
import {ChildrenEventsListProps} from "../../event-chains.types";

export const ChildrenEventList: FC<ChildrenEventsListProps> = ({eventInfo, updateFn, title, childrenEvents, onConnectClick}) => {
	const {state, toggleState} = useBoolean(true)
	
	
	if (childrenEvents && childrenEvents.length > 0) {
		return (
			<ChainsAccordion
				titleBadge={childrenEvents.length}
				title={title}
				isWrap={state}
				onClickOnAction={() => {
					onConnectClick && onConnectClick()
				}}
				onWrapTitle={toggleState}
				content={
					<TaskChainItemsWrapper wrapState={state}>
						{childrenEvents
							.map(
								(item) => <TaskChainItem key={item?._id} suffix={'parentOf'} chainItem={item} updateFn={updateFn}/>
							)}
					</TaskChainItemsWrapper>
				}
			/>
		)
	}
	
	return <></>
}