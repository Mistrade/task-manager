import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { FriendItem } from '@pages/Friends/Tabs/FriendsList/FriendItem';

import {
  FRIEND_REQUESTS_TYPES,
  useGetContactsListQuery,
} from '@api/friends-api';

export interface FriendRequestListProps {
  requestType: FRIEND_REQUESTS_TYPES;
}

const titles = {
  [FRIEND_REQUESTS_TYPES.OUTGOING]: 'Исходящие заявки в друзья',
  [FRIEND_REQUESTS_TYPES.INCOMING]: 'Входящие заявки в друзья',
};

export const FriendRequestList: FC<FriendRequestListProps> = ({
  requestType,
}) => {
  const { data: requestList, isFetching } = useGetContactsListQuery(
    requestType,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      <Helmet title={titles[requestType]} />
      <FlexBlock direction={'column'} gap={8}>
        {requestList?.data?.map((item) => (
          <FriendItem key={item._id} user={item.userInfo} />
        ))}
      </FlexBlock>
    </>
  );
};
