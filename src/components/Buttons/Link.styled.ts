import styled from "styled-components";
import {Link} from "react-router-dom";
import {currentColor} from "../../common/constants";

export const LinkStyled = styled(Link)`
	font-size: 14px;
	color: ${currentColor};
	outline: none;
	text-decoration: none;
	font-family: "Helvetica Neue", sans-serif;
	line-height: 1.2;
`