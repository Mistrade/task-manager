import { UserModel } from '@api/session-api/session-api.types';
import { SessionInterceptor } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { Contacts } from '@pages/Friends/Contacts';
import { useAppSelector } from '@redux/hooks/hooks';
import { selectUserInfo } from '@redux/reducers/session/session-selectors';
import React, { FC } from 'react';

export const FriendsRoutes: FC = () => {
  const userInfo = useAppSelector(selectUserInfo);
  return (
    <SessionInterceptor userInfo={userInfo} mode={'show'}>
      <Contacts userInfo={userInfo as UserModel} />
    </SessionInterceptor>
  );
};
