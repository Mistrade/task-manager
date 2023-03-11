import styled from "styled-components";
import {
	borderRadiusSize,
	currentColor,
	darkColor,
	disabledColor,
	pageHeaderColor
} from "../../../../../../../../common/constants";
import {FlexBlock} from "../../../../../../../../components/LayoutComponents/FlexBlock";

export const EventEssenceContainer = styled('div')`
  display: flex;
  width: 100%;
  padding: 8px;
  border-radius: ${borderRadiusSize.sm};
  border: 2px solid ${disabledColor};
  flex-direction: column;
  gap: 8px;
  background-color: ${pageHeaderColor};
  height: fit-content;
  transition: height .3s ease-in;
  text-align: left;
`

export const EventEssenceTitle = styled('h4')`
  text-align: left;
  flex-grow: 3;
  overflow-x: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: ${darkColor};
  white-space: break-spaces;
  word-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const ReplyContent = styled(FlexBlock)`
  padding-left: 20px;
  border-left-width: 2px;
  border-left-style: solid;
  border-left-color: ${currentColor};
`