import {FC, ReactNode} from "react";
import {currentColor, defaultColor} from "../../common/constants";
import {css} from "styled-components";
import {FlexBlock} from "../LayoutComponents/FlexBlock";
import * as React from "react";

interface SessionFormContainerProps {
	children: ReactNode,
	handleSubmit?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void,
	elementsGap?: number
}


export const SessionFormContainer: FC<SessionFormContainerProps> = ({children, handleSubmit, elementsGap = 24}) => {
	return (
		<FlexBlock width={'100%'} justify={'center'} pt={'3rem'}>
			<form onSubmit={handleSubmit}>
				<FlexBlock
					direction={'column'}
					maxWidth={'50rem'}
					minWidth={'30rem'}
					p={'24px 16px'}
					border={`1px solid ${currentColor}`}
					borderRadius={4}
					additionalCss={css`
            box-shadow: 0px 2px 5px ${defaultColor};
					`}
					gap={elementsGap}
				>
					{children}
				</FlexBlock>
			</form>
		</FlexBlock>
	)
}