import {
  CommentActionButton,
  StyledReplyComment,
  StyledReplyCommentActionContainer,
} from '../comments.styled';
import { ReplyCommentProps } from '../comments.types';
import { CommentDate } from './CommentDate';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { TrashIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { kitColors, Tooltip } from 'chernikov-kit';
import dayjs from 'dayjs';
import React, { FC } from 'react';


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
          style={{ color: kitColors.primary, fontSize: 15 }}
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