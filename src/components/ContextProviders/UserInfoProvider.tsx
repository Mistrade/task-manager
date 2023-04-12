import { useConfirmSessionQuery } from '@api/session-api';
import { FCWithChildren } from '@pages/planner/planner.types';
import React from 'react';
import { disableReRender } from '@src/common/utils/react-utils';
import { Loader } from '@components/Loaders/Loader';
import { UserInfoContext } from '@src/Context/userInfo.context';

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
