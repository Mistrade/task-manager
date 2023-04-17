import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { FRIENDS_PAGE_TITLES } from '@src/common/constants';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { FriendItem } from '@pages/Friends/Tabs/FriendsList/FriendItem';

import {
  FRIEND_REQUESTS_TYPES,
  useGetContactsListQuery,
} from '@api/friends-api';

export interface FriendRequestListProps {}

export const OutgoingRequestList: FC<FriendRequestListProps> = () => {
  const { data: requestList, isFetching } = useGetContactsListQuery(
    FRIEND_REQUESTS_TYPES.OUTGOING
  );

  return (
    <>
      <Helmet title={FRIENDS_PAGE_TITLES[FRIEND_REQUESTS_TYPES.OUTGOING]} />
      <FlexBlock direction={'column'} gap={8}>
        {requestList?.data?.map((item) => (
          <FriendItem
            key={item._id}
            user={item.userInfo}
            primaryButton={
              <EmptyButtonStyled>Отменить запрос</EmptyButtonStyled>
            }
          />
        ))}
      </FlexBlock>
    </>
  );
};
