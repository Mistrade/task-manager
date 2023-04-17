import { FC, ReactNode } from 'react';

import { SERVICES_NAMES } from '@src/common/constants';

import { LinkStyled } from '@components/Buttons/Link.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import {
  FriendItemContainer,
  FriendItemContentContainer,
} from '@pages/Friends/Tabs/FriendsList/styled';

import { UserAvatar } from '@planner/Users/UserAvatar';

import { UserModel } from '@api/session-api/session-api.types';

export interface FriendItemProps {
  user: UserModel;
  primaryButton?: ReactNode;
  secondaryButton?: ReactNode;
}

export const FriendItem: FC<FriendItemProps> = ({
  user,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <FriendItemContainer>
      <LinkStyled to={`/${SERVICES_NAMES.PROFILE}/${user._id}`}>
        <UserAvatar size={100} user={user} />
      </LinkStyled>
      <FriendItemContentContainer>
        <FlexBlock gap={12} direction={'row'} mb={16}>
          <LinkStyled
            fontSize={16}
            to={`/${SERVICES_NAMES.PROFILE}/${user._id}`}
          >
            {user.surname} {user.name} {user.patronymic || ''}
          </LinkStyled>
        </FlexBlock>
        <FlexBlock gap={6}>
          {primaryButton}
          {secondaryButton}
        </FlexBlock>
      </FriendItemContentContainer>
    </FriendItemContainer>
  );
};
