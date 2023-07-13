import { useCreateEventModal } from '@hooks/useCreateEventModal';
import React from 'react';
import { Helmet } from 'react-helmet';

import { Button } from '@components/Buttons/Buttons.styled';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents';

import { FriendItem } from '@pages/friends/Tabs/FriendsList/FriendItem';

import { useGetFriendsListQuery } from '@api/friends-api';
import { UserModel } from '@api/session-api/session-api.types';

export const FriendsList = () => {
  const { data: friendsList, isFetching } = useGetFriendsListQuery();
  const { openModal, declineModal } = useCreateEventModal();

  const createEventHandler = (user: UserModel) => {
    openModal(
      {
        members: { [user._id]: user },
      },
      {}
    );
  };

  return (
    <>
      <Helmet title={`Список друзей`} />
      <FlexBlock gap={8} direction={'column'}>
        {friendsList?.data?.map((user) => (
          <FriendItem
            key={user._id}
            user={user}
            primaryButton={
              <Button onClick={() => createEventHandler(user)}>
                Запланировать событие
              </Button>
            }
            secondaryButton={
              <EmptyButtonStyled>Написать сообщение</EmptyButtonStyled>
            }
          />
        ))}
      </FlexBlock>
    </>
  );
};
