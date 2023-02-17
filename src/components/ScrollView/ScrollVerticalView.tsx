import {ReactNode} from "react";
import styled from "styled-components";
import {FCWithChildren} from "../Calendars/types";
import {pxToCssValue} from "../LayoutComponents/FlexBlock";

export interface ScrollVerticalViewProps {
	placementStatic?: 'top' | 'bottom',
	gap?: number,
	staticContent?: ReactNode
}

//width={'100%'}
// 			height={'100%'}
// 			direction={'column'}
// 			className={'messages--container'}
// 			gap={6}
// 			pb={6}

const Container = styled('div')<{ gap?: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: ${_ => pxToCssValue(_.gap || 6)};
`

Container.defaultProps = {
	className: "scroll__view__horizontal--container"
}

const ScrollContainer = styled('div')`
  flex-grow: 3;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
`

ScrollContainer.defaultProps = {
	className: "scroll__content--container"
}

const StaticContainer = styled('div')`
  width: 100%;
  flex-grow: 0;
`

StaticContainer.defaultProps = {
	className: "scroll__static--container"
}


export const ScrollVerticalView: FCWithChildren<ScrollVerticalViewProps> = ({
																																									children,
																																									placementStatic,
																																									staticContent,
																																									gap
																																								}) => {
	return (
		<Container
			gap={gap}
		>
			{placementStatic === 'top' && staticContent && (
				<StaticContainer>
					{staticContent}
				</StaticContainer>
			)}
			<ScrollContainer>
				{children}
			</ScrollContainer>
			{placementStatic === 'bottom' && staticContent && (
				<StaticContainer>
					{staticContent}
				</StaticContainer>
			)}
		</Container>
	)
}