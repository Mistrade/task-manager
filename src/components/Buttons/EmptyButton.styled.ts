import styled from "styled-components";
import {lightHoverColor} from "../../common/constants";

export const EmptyButtonStyled = styled('button')`
  & {
    position: relative;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 16px;
    display: flex;
    flex-wrap: nowrap;
    cursor: pointer;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 4px 6px;
  }

  &:focus {
    border-radius: 4px;
    background-color: ${lightHoverColor};
  }


  &:hover {
    border-radius: 4px;
    background-color: ${lightHoverColor};
  }
`

EmptyButtonStyled.defaultProps = {
	type: 'button'
}

export const EmptyLink = styled('a')`
  & {
    position: relative;
    outline: none;
    border: none;
    background-color: transparent;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    flex-wrap: nowrap;
    cursor: pointer;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 4px 6px;
  }

  &:focus {
    border-radius: 4px;
    background-color: ${lightHoverColor};
  }


  &:hover {
    border-radius: 4px;
    background-color: ${lightHoverColor};
  }
`