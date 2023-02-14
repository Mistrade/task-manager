import styled from "styled-components";
import {borderRadiusSize, defaultColor, pageHeaderColor} from "../../common/constants";

export const Badge = styled('span')`
	line-height: 1;
	padding: 2px 4px;
	border-radius: ${borderRadiusSize.xs};
	font-size: 14px;
	color: ${defaultColor};
	background-color: ${pageHeaderColor};
`