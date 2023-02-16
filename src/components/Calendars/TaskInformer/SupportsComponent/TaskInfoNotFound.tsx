import {FC} from "react";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {SadSmile} from "../../../Icons/Icons";

export const TaskInfoNotFound: FC<{ message?: string }> = ({message}) => (
	<FlexBlock
		height={'100%'}
		width={'100%'}
		justify={'center'}
		align={'center'}
		wrap={'wrap'}
		p={'24px 0'}
	>
		<FlexBlock
			width={'100%'}
			justify={'center'}
			align={'center'}
			mb={24}
		>
			<SadSmile color={'darkorange'}/>
		</FlexBlock>
		<FlexBlock
			width={'100%'}
			justify={'center'}
		>
			{message || 'К сожалению, не удалось загрузить информацию по данному заданию.'}
		</FlexBlock>
	</FlexBlock>
)