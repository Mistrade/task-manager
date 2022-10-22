import {FlexBlock} from "../LayoutComponents/FlexBlock"
import {FC} from "react";
import {Heading} from "../Text/Heading";
import {defaultColor, ERROR_IMAGES} from "../../common/constants";
import {DocumentErrorTypes} from "../../common/types";

export interface ErrorScreenProps {
	description?: string,
	title: string,
	errorType: DocumentErrorTypes
}

export const ErrorScreen: FC<ErrorScreenProps> = ({
																										description,
																										title,
																										errorType
																									}) => {
	return (
		<FlexBlock
			justify={'center'}
			wrap={'wrap'}
			width={'100%'}
		>
			<FlexBlock
				justify={'center'}
				align={'center'}
				mb={12}
				width={'100%'}
			>
				{ERROR_IMAGES[errorType]}
			</FlexBlock>
			<FlexBlock
				width={'100%'}
				justify={'center'}
				mb={12}
			>
				<Heading.H2
					style={{
						textAlign: 'center',
						fontSize: 28,
						lineHeight: 1.2
					}}
				>
					{title}
				</Heading.H2>
			</FlexBlock>
			<FlexBlock
				width={'100%'}
				justify={'center'}
			>
				<p
					style={{
						fontSize: 18,
						lineHeight: 1.5,
						textAlign: 'center',
						color: defaultColor,
						whiteSpace: 'pre-wrap'
					}}
				>
					{description}
				</p>
			</FlexBlock>
		</FlexBlock>
	)
}