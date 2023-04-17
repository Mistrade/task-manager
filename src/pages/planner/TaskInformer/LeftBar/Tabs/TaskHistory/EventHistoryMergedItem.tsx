import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useAppSelector } from '@redux/hooks/hooks';
import { selectUserInfo } from '@redux/reducers/session/session-selectors';
import { plannerSelectLayout } from '@selectors/planner';
import React, { ReactNode } from 'react';

import { SERVICES_NAMES, currentColor } from '@src/common/constants';
import { MergedObject, getPath } from '@src/common/functions';

import { LinkStyled } from '@components/Buttons/Link.styled';
import { UserHoverCard } from '@components/HoverCard/UserHoverCard';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { UserAvatar } from '@planner/Users/UserAvatar';

import { UserModel } from '@api/session-api/session-api.types';

import {
  CommentStickyAvatar,
  MergedCommentContainer,
  MergedCommentDataContainer,
  MergedCommentDataUserName,
  MergedCommentUserInfo,
} from '../TaskComments/SupportComponents/MergedCommentItem';

export interface EventHistoryMergedItemProps<
  Type,
  ItemType extends MergedObject<Type, keyof Type, Type>
> {
  mergeItem: ItemType;
  renderGroup: (item: ItemType) => ReactNode;
}

export function MergedNote<
  Type,
  ItemType extends MergedObject<Type, keyof Type, Type>
>({
  mergeItem,
  renderGroup,
}: EventHistoryMergedItemProps<Type, ItemType>): JSX.Element {
  const { openModal } = useCreateEventModal();
  const currentUser = useAppSelector(selectUserInfo);
  const layout = useAppSelector(plannerSelectLayout);
  return (
    <MergedCommentContainer>
      <MergedCommentUserInfo>
        <CommentStickyAvatar>
          <Tooltip
            content={
              <UserHoverCard
                user={mergeItem.user}
                action={{
                  title: 'Запланировать событие',
                  onClick(user: UserModel) {
                    openModal(
                      {
                        members: [user],
                      },
                      {
                        useReturnBackOnDecline: true,
                        modalPath: getPath(
                          SERVICES_NAMES.PLANNER,
                          layout,
                          'event/create'
                        ),
                      }
                    );
                  },
                  condition: mergeItem.user._id !== currentUser?._id,
                }}
              />
            }
            theme={'light'}
            delay={[500, 100]}
            placement={'right'}
            animation={'shift-away'}
            offset={[0, 15]}
            interactive={true}
            interactiveBorder={4}
          >
            <UserAvatar user={mergeItem.user} />
          </Tooltip>
        </CommentStickyAvatar>
      </MergedCommentUserInfo>
      <MergedCommentDataContainer>
        <MergedCommentDataUserName>
          <LinkStyled
            style={{ color: currentColor, fontSize: 16 }}
            to={`/profile/${mergeItem.user._id}`}
            target={'_blank'}
          >
            {`${mergeItem.user.name} ${mergeItem.user.surname}`}
          </LinkStyled>
        </MergedCommentDataUserName>
        {renderGroup(mergeItem)}
      </MergedCommentDataContainer>
    </MergedCommentContainer>
  );
}
