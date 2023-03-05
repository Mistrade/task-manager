import {FC} from "react";
import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock";
import {EventChainItemsWrapperProps} from "../event-chains.types";

export const TaskChainItemsWrapper: FC<EventChainItemsWrapperProps> = ({wrapState, children}) => {
	return (
		<FlexBlock
			direction={'column'}
			gap={6}
			width={'100%'}
			maxHeight={wrapState ? 'fit-content' : "0px"}
			overflow={'hidden'}
		>
			{children}
		</FlexBlock>
	)
}