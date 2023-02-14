import styled from "styled-components";
import {Link} from "react-router-dom";
import {borderRadiusSize, currentColor} from "../../common/constants";

export const LinkStyled = styled(Link)`
	border-radius: ${borderRadiusSize.sm};
	font-size: 14px;
	color: ${currentColor};
	outline: none;
	text-decoration: none;
	font-family: "Helvetica Neue", sans-serif;
	line-height: 1.2;
`