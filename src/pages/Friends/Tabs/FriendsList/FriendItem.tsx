import { UserModel } from '@api/session-api/session-api.types';
import { Button } from '@components/Buttons/Buttons.styled';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { LinkStyled } from '@components/Buttons/Link.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import {
  FriendItemContainer,
  FriendItemContentContainer,
} from '@pages/Friends/Tabs/FriendsList/styled';
import { UserAvatar } from '@planner/Users/UserAvatar';
import { ServicesNames } from '@redux/reducers/global';
import { FC } from 'react';

export interface FriendItemProps {
  user: UserModel;
  onCreateEvent?: () => void;
}

export const FriendItem: FC<FriendItemProps> = ({ user, onCreateEvent }) => {
  return (
    <FriendItemContainer>
      <LinkStyled to={`/${ServicesNames.PROFILE}/${user._id}`}>
        <UserAvatar size={100} user={user} />
      </LinkStyled>
      <FriendItemContentContainer>
        <FlexBlock gap={12} direction={'row'} mb={16}>
          <LinkStyled
            fontSize={16}
            to={`/${ServicesNames.PROFILE}/${user._id}`}
          >
            {user.surname} {user.name} {user.patronymic || ''}
          </LinkStyled>
        </FlexBlock>
        <FlexBlock gap={6}>
          <Button onClick={onCreateEvent}>Запланировать событие</Button>
          <EmptyButtonStyled>Написать сообщение</EmptyButtonStyled>
        </FlexBlock>
      </FriendItemContentContainer>
    </FriendItemContainer>
  );
};
