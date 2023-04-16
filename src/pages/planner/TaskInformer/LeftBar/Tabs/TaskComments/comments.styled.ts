import styled, { keyframes } from 'styled-components';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import {
  currentColor,
  darkColor,
  defaultColor,
  disabledColor,
  hoverColor,
  pageHeaderColor,
} from '@src/common/constants';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';

export const CreateCommentContainer = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
  background-color: ${pageHeaderColor};
  padding: 12px 16px;
  width: 100%;
  border-top: 2px solid ${disabledColor};
  border-radius: 0px 0px ${borderRadiusSize.sm} ${borderRadiusSize.sm};
`;
export const StyledCommentContainer = styled('ul')`
  & {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    gap: 4px;
  }
`;

export const ChatItem = styled('li')`
  & {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 4px 16px;
    gap: 6px;
    background-color: transparent;
    cursor: pointer;
    border-radius: ${borderRadiusSize.xs};
    transition: 0.2s ease-in background-color;
  }
`;

export const StyledCommentText = styled(ChatItem)`
  &:hover {
    background-color: ${pageHeaderColor};
  }
`;
export const StyledCommentDate = styled('p')`
  & {
    margin: 0;
    color: ${defaultColor};
    font-size: 14px;
  }
`;
export const StyledCommentDescription = styled('p')`
  & {
    position: relative;
    margin: 0;
    color: ${darkColor};
    font-size: 15px;
    white-space: break-spaces;
  }
`;

export const StyledReplyComment = styled('div')`
  & {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-left-width: 3px;
    border-left-style: solid;
    border-left-color: ${hoverColor};
    padding: 4px 40px 4px 8px;
    font-size: 14px;
    color: ${defaultColor};
    cursor: pointer;
    transition: border-left-color 0.3s ease-in-out;
    position: relative;
  }

  &:hover {
    border-left-color: ${currentColor};
  }
`;
export const StyledReplyCommentActionContainer = styled('div')`
  & {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;
export const CommentActionButton = styled(EmptyButtonStyled)`
  padding: 3px 5px;
`;
export const commentActionsKeyframe = keyframes`
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
`;
export const CommentActionsContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  gap: 6px;
  animation: ${commentActionsKeyframe} 0.25s ease-out;
`;
export const ScrollContainer = styled('div')`
  //height: 100%;
  position: relative;
`;
export const MessagesListContainer = styled('div')`
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
`;
export const MessageContainer = styled('div')`
  display: flex;
  gap: 6px;
  flex-direction: column;

  & .user--name {
    position: sticky;
    left: 0;
    top: 0;
    background-color: #fff;
    padding: 4px 12px;
    color: ${defaultColor};
  }

  & .comment--message {
    white-space: pre-wrap;
    width: 100%;
    padding: 8px;
    //border: 1px solid ${disabledColor};
    border-radius: ${borderRadiusSize.sm};
  }
`;
export const NonViewScroller = styled('div')`
  width: 0;
  height: 0;
`;