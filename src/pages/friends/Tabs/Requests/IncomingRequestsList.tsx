import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { FRIENDS_PAGE_TITLES } from '@src/common/constants/defaultConstants';
import {
  FRIEND_REQUESTS_TYPES,
  FRIEND_REQUEST_ACCEPT_STATUSES,
} from '@src/common/constants/enums';

import { ButtonWithLoading } from '@components/Buttons/ButtonWithLoading';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents';

import { FriendItem } from '@pages/friends/Tabs/FriendsList/FriendItem';
import { FriendRequestListProps } from '@pages/friends/Tabs/Requests/OutgoingRequestList';

import {
  useGetContactsListQuery,
  useResponseOnFriendRequestMutation,
} from '@api/friends-api';

export const IncomingRequestList: FC<FriendRequestListProps> = () => {
  const { data: requestList, isFetching } = useGetContactsListQuery(
    FRIEND_REQUESTS_TYPES.INCOMING
  );

  const [responseOnRequest] = useResponseOnFriendRequestMutation();

  return (
    <>
      <Helmet title={FRIENDS_PAGE_TITLES[FRIEND_REQUESTS_TYPES.OUTGOING]} />
      <FlexBlock direction={'column'} gap={8}>
        {requestList?.data?.map((item) => (
          <FriendItem
            key={item._id}
            user={item.userInfo}
            primaryButton={
              <ButtonWithLoading
                buttonType={'primary'}
                onClick={() =>
                  responseOnRequest({
                    _id: item._id,
                    acceptedStatus: FRIEND_REQUEST_ACCEPT_STATUSES.ACCEPTED,
                  })
                }
              >
                Принять запрос
              </ButtonWithLoading>
            }
            secondaryButton={
              <EmptyButtonStyled
                onClick={() =>
                  responseOnRequest({
                    _id: item._id,
                    acceptedStatus: FRIEND_REQUEST_ACCEPT_STATUSES.DECLINE,
                  })
                }
              >
                Отменить запрос
              </EmptyButtonStyled>
            }
          />
        ))}
      </FlexBlock>
    </>
  );
};
