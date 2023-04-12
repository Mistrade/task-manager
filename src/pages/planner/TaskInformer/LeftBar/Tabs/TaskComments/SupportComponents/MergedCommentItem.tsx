import styled from 'styled-components';
import { MergedComment } from './CommentsList';
import React from 'react';
import { BaseCommentActionsProps, CommentGroupProps } from '../comments.types';

export const MergedCommentContainer = styled('li')`
  & {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 8px;
    position: relative;
    align-items: stretch;
  }
`;

export const MergedCommentUserInfo = styled('div')`
  & {
    width: fit-content;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
`;

export const MergedCommentDataContainer = styled('div')`
  & {
    display: flex;
    flex-grow: 10;
    flex-direction: column;
    position: relative;
    //z-index: 0;
  }
`;

export const MergedCommentDataUserName = styled('div')`
  & {
    display: flex;
    width: 100%;
    padding-bottom: 8px;
    padding-left: 16px;
    background-color: #fff;
    //z-index: 1;
    //position: sticky;
    //top: 0;
    //left: 0;
  }
`;

export const CommentStickyAvatar = styled('div')`
  position: sticky;
  top: 0;
  left: 0;
  cursor: pointer;
`;

export interface MergedCommentItemProps extends BaseCommentActionsProps {
  comment: MergedComment;
  scrollToAnsweredCommentFn: CommentGroupProps['onClickToReplyComment'];
}
