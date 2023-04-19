import dayjs from 'dayjs';
import React, { FC } from 'react';

import { DateHelper } from '@src/common/calendarSupport/dateHelper';
import { defaultColor } from '@src/common/constants/constants';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { AnswerIcon } from '@components/Icons/CalendarIcons/AnswerIcon';
import { TrashIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';

import { CommentModel } from '@api/planning-api/types/comments.types';
import { ObjectId } from '@api/rtk-api.types';

import { MessageContainer, MessagesListContainer } from '../comments.styled';

export interface AnsweredCommentProps {
  commentItem?: CommentModel | null;
  onDelete?: (item: CommentModel) => void;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    sourceEventId: ObjectId
  ) => void;
}

export const AnsweredComment: FC<AnsweredCommentProps> = ({
  commentItem,
  onDelete,
  onClick,
}) => {
  if (!commentItem) {
    return <></>;
  }

  return (
    <FlexBlock
      direction={'row'}
      align={'flex-start'}
      gap={6}
      width={'100%'}
      style={{ cursor: 'pointer' }}
    >
      <AnswerIcon />
      <MessagesListContainer>
        <MessageContainer>
          <FlexBlock
            direction={'row'}
            justify={'space-between'}
            gap={6}
            align={'center'}
          >
            <FlexBlock
              gap={6}
              fSize={12}
              pl={6}
              style={{ lineHeight: '16px' }}
              align={'flex-end'}
            >
              {[
                'В ответ на комментарий пользователя ',
                <LinkStyled
                  to={`/profile/${commentItem.userId._id}`}
                  target={'_blank'}
                >
                  {`${commentItem.userId.name} ${commentItem.userId.surname}`}
                </LinkStyled>,
                `от ${DateHelper.getHumanizeDateValue(
                  dayjs(commentItem.date).toDate(),
                  {
                    withTime: true,
                    withYear: true,
                    monthPattern: 'short',
                    yearPattern: 'full',
                  }
                )}`,
              ]}
            </FlexBlock>
            {onDelete && (
              <EmptyButtonStyled onClick={() => onDelete(commentItem)}>
                <TrashIcon size={16} color={defaultColor} />
              </EmptyButtonStyled>
            )}
          </FlexBlock>
          <FlexBlock
            className={'comment--message'}
            fSize={14}
            bgColor={'#fff !important'}
            onClick={(e) =>
              onClick && commentItem && onClick(e, commentItem?._id)
            }
          >
            <CutText>{commentItem.message}</CutText>
          </FlexBlock>
        </MessageContainer>
      </MessagesListContainer>
    </FlexBlock>
  );
};
