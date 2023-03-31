import React, { FC, useContext } from 'react';
import { Contacts } from '../../../pages/Contacts/Contacts';
import { UserModel } from '../../../store/api/session-api/session-api.types';
import { SessionInterceptor } from '../Interceptors/SessionInterceptor';
import { UserInfoContext } from '../../../Context/userInfo.context';

export const FriendsRoutes: FC = () => {
  const userInfo = useContext(UserInfoContext);

  return (
    <SessionInterceptor userInfo={userInfo} mode={'show'}>
      <Contacts userInfo={userInfo as UserModel} />
    </SessionInterceptor>
  );
};
