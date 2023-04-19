import { FC } from 'react';

import { Loader } from '@components/Loaders/Loader';

import { CreateEventMembersItem } from '@planner/Forms/CreateEvent/Tabs/Members/Item';
import { CreateEventDataObject } from '@planner/planner.types';

import { useGetFriendsListQuery } from '@api/friends-api';
import { UserModel } from '@api/session-api/session-api.types';


export interface CreateFormMembersList {
  selected: CreateEventDataObject['members'];
}

export const CreateEventMembersList: FC<CreateFormMembersList> = ({
  selected,
}) => {
  const { data: friends, isFetching } = useGetFriendsListQuery();
  return (
    <Loader title={'Загрузка списка друзей'} isActive={isFetching}>
      {friends?.data?.map((user: UserModel) => (
        <CreateEventMembersItem key={user._id} />
      ))}
    </Loader>
  );
};