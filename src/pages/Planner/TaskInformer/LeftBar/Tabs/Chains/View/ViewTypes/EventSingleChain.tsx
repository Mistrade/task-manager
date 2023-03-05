import {FC} from "react";
import {TaskChainItem} from "../TaskChainItem";
import {ChainsAccordion} from "../ChainsAccordion";
import {TaskChainItemsWrapper} from "../TaskChainItemsWrapper";
import {useBoolean} from "../../../../../../../../hooks/useBoolean";
import {EventSingleChainProps, ChainsEventModel} from "../../event-chains.types";


export const EventSingleChain: FC<EventSingleChainProps> = ({fromTask, updateFn, title, suffix}) => {
	const {state, toggleState} = useBoolean(true)
	
	if (fromTask) {
		return (
			<ChainsAccordion
				title={title}
				isWrap={state}
				onWrapTitle={toggleState}
				content={
					<TaskChainItemsWrapper wrapState={state}>
						<TaskChainItem chainItem={fromTask as unknown as ChainsEventModel} suffix={suffix} updateFn={updateFn}/>
					</TaskChainItemsWrapper>
				}
			/>
		)
	}
	
	return <></>
}