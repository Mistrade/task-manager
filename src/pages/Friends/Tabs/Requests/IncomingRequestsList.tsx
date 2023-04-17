import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { FRIENDS_PAGE_TITLES } from '@src/common/constants';

import { ButtonWithLoading } from '@components/Buttons/ButtonWithLoading';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { FriendItem } from '@pages/Friends/Tabs/FriendsList/FriendItem';
import { FriendRequestListProps } from '@pages/Friends/Tabs/Requests/OutgoingRequestList';

import {
  ContactAcceptStatuses,
  FRIEND_REQUESTS_TYPES,
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
                    acceptedStatus: ContactAcceptStatuses.ACCEPTED,
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
                    acceptedStatus: ContactAcceptStatuses.DECLINE,
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
