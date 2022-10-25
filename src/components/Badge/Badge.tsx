import styled from "styled-components";
import {defaultColor, pageHeaderColor} from "../../common/constants";

export const Badge = styled('span')`
	line-height: 1;
	padding: 2px 4px;
	border-radius: 4px;
	font-size: 14px;
	color: ${defaultColor};
	background-color: ${pageHeaderColor};
`