import {FC, ReactNode} from "react";
import { FlexBlock } from "../../../../LayoutComponents/FlexBlock";

export interface TaskChainItemsWrapperProps {
	wrapState: boolean,
	children: ReactNode
}

export const TaskChainItemsWrapper: FC<TaskChainItemsWrapperProps> = ({wrapState, children}) => {
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