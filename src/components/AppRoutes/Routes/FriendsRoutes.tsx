import React, { FC, useContext } from 'react';
import { Contacts } from '@contacts/Contacts';
import { UserModel } from '@api/session-api/session-api.types';
import { SessionInterceptor } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { UserInfoContext } from '@src/Context/userInfo.context';

export const FriendsRoutes: FC = () => {
  const userInfo = useContext(UserInfoContext);

  return (
    <SessionInterceptor userInfo={userInfo} mode={'show'}>
      <Contacts userInfo={userInfo as UserModel} />
    </SessionInterceptor>
  );
};
