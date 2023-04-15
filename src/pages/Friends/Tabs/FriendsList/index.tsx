import { useGetFriendsListQuery } from '@api/friends-api';
import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { FriendItem } from '@pages/Friends/Tabs/FriendsList/FriendItem';
import { CreateEventModal } from '@planner/Forms/CreateEvent/CreateEventModal';
import { useAppSelector } from '@redux/hooks/hooks';
import { selectCreateEventModalIsOpen } from '@selectors/planner';

export const FriendsList = () => {
  const { data: friendsList, isFetching } = useGetFriendsListQuery();
  const isOpenModal = useAppSelector(selectCreateEventModalIsOpen);
  const { openModal, declineModal } = useCreateEventModal();

  return (
    <>
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
    </>
  );
};
