import { MergedObject } from '../../../../../../common/functions';
import React, { ReactNode } from 'react';
import {
  CommentStickyAvatar,
  MergedCommentContainer,
  MergedCommentDataContainer,
  MergedCommentDataUserName,
  MergedCommentUserInfo,
} from '../TaskComments/SupportComponents/MergedCommentItem';
import { Tooltip } from '../../../../../../components/Tooltip/Tooltip';
import { UserHoverCard } from '../../../../../../components/HoverCard/UserHoverCard';
import { UserAvatar } from '../../../../Users/UserAvatar';
import { LinkStyled } from '../../../../../../components/Buttons/Link.styled';
import { currentColor } from '../../../../../../common/constants';

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
  return (
    <MergedCommentContainer>
      <MergedCommentUserInfo>
        <CommentStickyAvatar>
          <Tooltip
            content={<UserHoverCard user={mergeItem.user} />}
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
