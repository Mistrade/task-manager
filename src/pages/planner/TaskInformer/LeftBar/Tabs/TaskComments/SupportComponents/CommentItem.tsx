import React, { FC, useMemo, useState } from 'react';
import { CommentItemProps } from '../comments.types';
import { StyledCommentText } from '../comments.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { CommentDate } from './CommentDate';
import dayjs from 'dayjs';
import { CommentActions } from './CommentActions';
import { ReplyComment } from './ReplyComment';
import { CommentDescription } from './CommentDescription';

export const CommentItem: FC<CommentItemProps> = ({
  item,
  scrollToAnsweredCommentFn,
  onRemoveComment,
  onReplyToComment,
  onUpdateCommentClick,
}) => {
  const [isHover, setIsHover] = useState(false);

  const isUpdated = useMemo((): boolean => {
    const updatedDate = item.updatedAt ? dayjs(item.updatedAt) : false;

    if (!updatedDate) return false;

    return dayjs(updatedDate).isAfter(item.date, 'second');
  }, [item]);

  return (
    <StyledCommentText
      id={`comment_item_${item._id}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <FlexBlock direction={'row'} gap={16} height={22} align={'center'}>
        <CommentDate date={dayjs(item.date).toDate()} isUpdated={isUpdated} />
        {isHover && (
          <FlexBlock justify={'flex-end'} grow={3}>
            <CommentActions
              onUpdateCommentClick={onUpdateCommentClick}
              comment={item}
              onRemoveComment={onRemoveComment}
              onReplyToComment={onReplyToComment}
            />
          </FlexBlock>
        )}
      </FlexBlock>
      {item.sourceComment && (
        <ReplyComment
          scrollToAnsweredCommentFn={scrollToAnsweredCommentFn}
          replyComment={item.sourceComment}
        />
      )}
      <CommentDescription text={item.message} />
    </StyledCommentText>
  );
};
