import styled from "styled-components";
import {lightHoverColor} from "../../common/constants";

export const EmptyButtonStyled = styled('button')`
  & {
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
    padding: 4px;
  }


  &:hover {
    border-radius: 4px;
    background-color: ${lightHoverColor};
  }
`