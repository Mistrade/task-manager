import { TFriendsModelList } from '@api/friends-api/friends-api.types';
import { FC, ReactNode, useCallback } from 'react';
import { FriendEssence } from '@components/Essences/UserEssence/FriendEssence';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import {
  CONTACT_TYPES,
  ContactAcceptStatuses,
  useResponseOnFriendRequestMutation,
} from '@api/friends-api';
import { ObjectId } from '@api/rtk-api.types';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

export interface IContactsListProps {
  list: TFriendsModelList;
  emptyError: ReactNode;
  listType: CONTACT_TYPES;
}

export const ContactsList: FC<IContactsListProps> = ({
  list,
  emptyError,
  listType,
}) => {
  const [responseOnRequest] = useResponseOnFriendRequestMutation();

  const responseOnRequestHandler = useCallback(
    async (status: ContactAcceptStatuses, _id: ObjectId) => {
      await responseOnRequest({
        acceptedStatus: status,
        _id,
      })
        .unwrap()
        .then(thenHandleForToast)
        .catch(CatchHandleForToast);
    },
    [responseOnRequest]
  );

  if (list.length) {
    return (
      <>
        {list.map((item) => (
          <FriendEssence
            friendModel={item}
            onAccept={
              CONTACT_TYPES.INCOMING === listType
                ? responseOnRequestHandler
                : undefined
            }
            onDecline={
              CONTACT_TYPES.INCOMING === listType
                ? responseOnRequestHandler
                : undefined
            }
          />
        ))}
      </>
    );
  }

  return (
    <FlexBlock
      width={'100%'}
      height={'100%'}
      justify={'center'}
      align={'center'}
    >
      {emptyError}
    </FlexBlock>
  );
};
