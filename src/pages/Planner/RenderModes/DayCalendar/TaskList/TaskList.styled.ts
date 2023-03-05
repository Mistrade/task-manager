import styled from "styled-components";
import {defaultColor} from "../../../../../common/constants";

export const TaskPreviewDescription = styled('p')`
  & {
    margin: 0;
    padding: 0;
    max-width: 100%;
    font-size: 14px;
    line-height: 15px;
    max-height: 45px;
    overflow: hidden;
    white-space: break-spaces;
    word-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: ${defaultColor};
  }
`

export const TaskListMainContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-grow: 10;
  padding-bottom: 24px;
  margin-left: -8px;
  padding-left: 8px;
  margin-right: -8px;
  padding-right: 8px;
  z-index: 0
`

export const TaskListEventFiltersContainer = styled('div')`
	z-index: 10;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  background-color: #fff;
  gap: 12px;
  top: 0;
  left: 0;
  position: sticky;
	width: 100%;
`