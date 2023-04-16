import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useAppSelector } from '@redux/hooks/hooks';
import { selectCreateEventModalIsOpen } from '@selectors/planner';
import React from 'react';
import { Helmet } from 'react-helmet';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { FriendItem } from '@pages/Friends/Tabs/FriendsList/FriendItem';

import { CreateEventModal } from '@planner/Forms/CreateEvent/CreateEventModal';

import { useGetFriendsListQuery } from '@api/friends-api';

export const FriendsList = () => {
  const { data: friendsList, isFetching } = useGetFriendsListQuery();
  const isOpenModal = useAppSelector(selectCreateEventModalIsOpen);
  const { openModal, declineModal } = useCreateEventModal();

  return (
    <>
      <Helmet title={`Список друзей`} />
      <FlexBlock gap={8} direction={'column'}>
        {friendsList?.data?.map((user) => (
          <FriendItem
            key={user._id}
            user={user}
            onCreateEvent={() => {
              openModal(
                {
                  members: [user],
                },
                {}
              );
            }}
          />
        ))}
        {isOpenModal && (
          <CreateEventModal
            onSuccess={() => declineModal()}
            onClose={declineModal}
          />
        )}
      </FlexBlock>
    </>
  );
};
