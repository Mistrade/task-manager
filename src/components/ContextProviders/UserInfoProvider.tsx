import React from 'react';

import { disableReRender } from '@src/common/utils/react-utils';
import { UserInfoContext } from '@src/context/userInfo.context';

import { Loader } from '@components/Loaders/Loader';

import { FCWithChildren } from '@planner/types';

import { useConfirmSessionQuery } from '@api/session-api';

export const UserInfoProvider: FCWithChildren = React.memo(({ children }) => {
  const { data: userInfo, isFetching, isError } = useConfirmSessionQuery();

  return (
    <UserInfoContext.Provider value={userInfo?.data || null}>
      <Loader title={'Проверка сессии пользователя...'} isActive={isFetching}>
        {children}
      </Loader>
    </UserInfoContext.Provider>
  );
}, disableReRender);
