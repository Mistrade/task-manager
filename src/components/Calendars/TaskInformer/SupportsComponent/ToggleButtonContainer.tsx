import {FC, ReactNode} from "react";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import styled from "styled-components";

const StyledToggleButtonContainer = styled('label')`
  display: flex;
  align-items: center;
  gap: 6px;
  //background-color: #fff;
  //border-radius: 4px;
	//border: 1px solid #fff;
`

export const ToggleButtonContainer: FC<{ button: ReactNode, text: ReactNode, focusElementId: string }> = ({
																																																						button,
																																																						focusElementId,
																																																						text
																																																					}) => {
	return (
		<StyledToggleButtonContainer htmlFor={focusElementId}>
			<FlexBlock grow={0} shrink={0}>
				{button}
			</FlexBlock>
			{text && (
				<FlexBlock grow={1} shrink={1} maxWidth={'100%'}>
					{text}
				</FlexBlock>
			)}
		</StyledToggleButtonContainer>
	)
}