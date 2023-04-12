import React, { FC } from 'react';
import { ReplyCommentProps } from '../comments.types';
import {
  CommentActionButton,
  StyledReplyComment,
  StyledReplyCommentActionContainer,
} from '../comments.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { currentColor } from '@src/common/constants';
import { CommentDate } from './CommentDate';
import dayjs from 'dayjs';
import { CutText } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';
import { Tooltip } from '@components/Tooltip/Tooltip';
import { TrashIcon } from '@components/Icons/Icons';

export const ReplyComment: FC<ReplyCommentProps> = ({
  scrollToAnsweredCommentFn,
  replyComment,
  onRemove,
}) => {
  if (!replyComment) {
    return <></>;
  }

  return (
    <StyledReplyComment
      onClick={() =>
        replyComment?._id &&
        scrollToAnsweredCommentFn &&
        scrollToAnsweredCommentFn(replyComment?._id)
      }
    >
      <FlexBlock direction={'row'} gap={4} align={'flex-end'}>
        <LinkStyled
          style={{ color: currentColor, fontSize: 15 }}
          to={`/profile/${replyComment.userId._id}`}
          target={'_blank'}
        >
          {`${replyComment.userId.name} ${replyComment.userId.surname}`}
        </LinkStyled>
        <CommentDate date={dayjs(replyComment.date).toDate()} />
      </FlexBlock>
      <CutText>
        {replyComment.message.substring(0, 120) +
          (replyComment.message.length > 120 ? '...' : '')}
      </CutText>
      {onRemove && (
        <StyledReplyCommentActionContainer>
          <Tooltip
            placement={'top'}
            content={'Не отвечать на этот комментарий'}
          >
            <CommentActionButton
              type={'button'}
              onClick={(e) => {
                e.stopPropagation();
                onRemove && onRemove(replyComment);
              }}
            >
              <TrashIcon size={20} />
            </CommentActionButton>
          </Tooltip>
        </StyledReplyCommentActionContainer>
      )}
    </StyledReplyComment>
  );
};
