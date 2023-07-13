import { FC, useCallback } from 'react';

import { TaskInformerDescriptionInput } from '@planner/EventInfo/SupportsComponent/TaskInformerDescription';

import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from '@api/planning-api';
import { CatchHandleForToast } from '@api/tools';

import { CreateCommentContainer } from '../comments.styled';
import { CreateCommentBarProps } from '../comments.types';
import { ReplyComment } from './ReplyComment';


export const CommentForm: FC<CreateCommentBarProps> = ({
  replyComment,
  onDeleteAnsweredComment,
  eventInfo,
  onClickToReplyComment,
  updatedComment,
  onSuccessUpdComment,
  onClear,
}) => {
  const [create] = useCreateCommentMutation();
  const [update] = useUpdateCommentMutation();

  const createHandler = useCallback(
    async (message: string) => {
      if (updatedComment) {
        return await update({
          commentId: updatedComment._id,
          state: {
            message,
            sourceCommentId: updatedComment?.sourceComment?._id,
          },
          fieldName: 'content',
        })
          .unwrap()
          .then(() => {
            onSuccessUpdComment && onSuccessUpdComment();
          })
          .catch(CatchHandleForToast);
      }

      return await create({
        eventId: eventInfo._id,
        message: message,
        sourceCommentId: replyComment?._id || undefined,
      })
        .unwrap()
        .then(() => {
          onDeleteAnsweredComment && onDeleteAnsweredComment();
        })
        .catch(CatchHandleForToast);
    },
    [eventInfo, replyComment, updatedComment]
  );

  return (
    <CreateCommentContainer>
      <ReplyComment
        replyComment={updatedComment?.sourceComment || replyComment}
        onRemove={onDeleteAnsweredComment}
        scrollToAnsweredCommentFn={onClickToReplyComment}
      />
      <TaskInformerDescriptionInput
        maxHeight={200}
        useUpdateInitialValue={true}
        rows={4}
        inputPlaceholder={`Напишите свой комментарий`}
        updateFn={createHandler}
        onDecline={onClear}
        initialValue={updatedComment?.message || ''}
        clearOnDecline={true}
        clearOnComplete={true}
      />
    </CreateCommentContainer>
  );
};