import React, { FC } from 'react';
import { StyledCommentContainer } from '../comments.styled';
import { CommentGroupProps } from '../comments.types';
import { CommentItem } from './CommentItem';

export const CommentGroup: FC<CommentGroupProps> = ({
  comment,
  onClickToReplyComment,
  onRemoveComment,
  onReplyToComment,
  onUpdateCommentClick,
}) => {
  return (
    <StyledCommentContainer>
      {comment.arr.map((item) => (
        <CommentItem
          onUpdateCommentClick={onUpdateCommentClick}
          item={item}
          key={item._id}
          scrollToAnsweredCommentFn={onClickToReplyComment}
          onRemoveComment={onRemoveComment}
          onReplyToComment={onReplyToComment}
        />
      ))}
    </StyledCommentContainer>
  );
};
