import React, { FC } from 'react';

import { currentColor, defaultColor, orangeColor } from '@src/common/constants';

import { WhiteButton } from '@components/Buttons/Buttons.styled';
import { CopyToClipboardButton } from '@components/Buttons/CopyToClipboardButton';
import { AnswerIcon } from '@components/Icons/CalendarIcons/AnswerIcon';
import { PencilIcon, StarIcon, TrashIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { useToggleIsImportantCommentStateMutation } from '@api/planning-api';

import {
  CommentActionButton,
  CommentActionsContainer,
} from '../comments.styled';
import { CommentActionsProps } from '../comments.types';


export const RemoveAction: FC<
  Pick<CommentActionsProps, 'onRemoveComment' | 'comment'>
> = ({ onRemoveComment, comment }) => {
  if (onRemoveComment && comment) {
    return (
      <Tooltip
        trigger={'click'}
        interactive={true}
        interactiveBorder={15}
        content={
          <FlexBlock direction={'column'} align={'center'} gap={6} p={6}>
            <FlexBlock>Вы уверены?</FlexBlock>
            <WhiteButton
              style={{ fontSize: 14 }}
              onClick={() => onRemoveComment(comment)}
            >
              Удалить
            </WhiteButton>
          </FlexBlock>
        }
        delay={200}
      >
        <CommentActionButton>
          <TrashIcon size={16} color={currentColor} />
        </CommentActionButton>
      </Tooltip>
    );
  }

  return <></>;
};
export const CommentActions: FC<CommentActionsProps> = ({
  comment,
  onRemoveComment,
  onReplyToComment,
  onUpdateCommentClick,
}) => {
  const [toggleIsImportant] = useToggleIsImportantCommentStateMutation();

  return (
    <CommentActionsContainer>
      <Tooltip
        content={
          comment.isImportant
            ? 'Снять отметку "Важное"'
            : 'Отметить как "Важное"'
        }
        delay={200}
      >
        <CommentActionButton
          onClick={async () =>
            await toggleIsImportant({
              commentId: comment._id,
              state: !comment.isImportant,
              fieldName: 'isImportant',
            })
          }
        >
          <StarIcon
            size={16}
            color={comment.isImportant ? orangeColor : defaultColor}
            fillColor={comment.isImportant ? orangeColor : 'none'}
          />
        </CommentActionButton>
      </Tooltip>
      {comment.editable && (
        <Tooltip content={'Редактировать текст комментария'}>
          <CommentActionButton
            onClick={() =>
              onUpdateCommentClick && onUpdateCommentClick(comment)
            }
          >
            <PencilIcon size={16} />
          </CommentActionButton>
        </Tooltip>
      )}
      <Tooltip
        content={'Ответить на комментарий'}
        delay={200}
        interactive={false}
        interactiveBorder={0}
      >
        <CommentActionButton
          onClick={() => onReplyToComment && onReplyToComment(comment)}
        >
          <AnswerIcon size={16} />
        </CommentActionButton>
      </Tooltip>
      <Tooltip
        content={'Скопировать'}
        delay={200}
        interactive={false}
        interactiveBorder={0}
      >
        <CopyToClipboardButton content={comment.message} />
      </Tooltip>
      {onRemoveComment && comment.deletable && (
        <RemoveAction comment={comment} onRemoveComment={onRemoveComment} />
      )}
    </CommentActionsContainer>
  );
};