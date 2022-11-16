import styled from "styled-components";
import {LinkStyled} from "../Buttons/Link.styled";
import {currentColor, defaultColor} from "../../common/constants";

export const HeaderDefaultLink = styled(LinkStyled)`
  font-size: 16px;
  border: 1px solid ${defaultColor};
  border-radius: 4px;
  padding: 6px 16px;
  outline: none;
  cursor: pointer;
`

export const HeaderLinkStyled = styled(HeaderDefaultLink)<{ isSelected: boolean }>`
  & {
    transition: all .3s ease-in-out;
    background-color: ${props => props.isSelected ? currentColor : '#fff'};
    color: ${props => props.isSelected ? '#fff' : defaultColor};
  }

  &:hover {
    background-color: ${currentColor};
    color: #fff;
  }
`