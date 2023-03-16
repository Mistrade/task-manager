import { AnswerIcon } from '../../../../../../../components/Icons/CalendarIcons/AnswerIcon';
import { FlexBlock } from '../../../../../../../components/LayoutComponents/FlexBlock';
import { PreviewDescription } from '../../../../../RenderModes/DayCalendar/TaskList/TaskList.styled';
import React, { FC } from 'react';
import { LinkStyled } from '../../../../../../../components/Buttons/Link.styled';
import { EmptyButtonStyled } from '../../../../../../../components/Buttons/EmptyButton.styled';
import { TrashIcon } from '../../../../../../../components/Icons/Icons';
import { defaultColor } from '../../../../../../../common/constants';
import { DateHelper } from '../../../../../../../common/calendarSupport/dateHelper';
import dayjs from 'dayjs';
import { CommentModel } from '../../../../../../../store/api/planning-api/types/comments.types';
import { ObjectId } from '../../../../../../../store/api/rtk-api.types';
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
            <PreviewDescription>{commentItem.message}</PreviewDescription>
          </FlexBlock>
        </MessageContainer>
      </MessagesListContainer>
    </FlexBlock>
  );
};
