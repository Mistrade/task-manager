import {FC, ReactNode} from "react";
import {FlexBlock} from "../../../../components/LayoutComponents/FlexBlock";
import styled from "styled-components";

const StyledToggleButtonContainer = styled('label')`
  display: flex;
  align-items: center;
  gap: 6px;
  //background-color: #fff;
  //border-radius: 4px;
  //border: 1px solid #fff;
`

export const ToggleButtonContainer: FC<{ button: ReactNode, focusElementId: string }> = ({
																																													button,
																																													focusElementId,
																																												}) => {
	return (
		<StyledToggleButtonContainer htmlFor={focusElementId}>
			<FlexBlock grow={0} shrink={0}>
				{button}
			</FlexBlock>
		</StyledToggleButtonContainer>
	)
}