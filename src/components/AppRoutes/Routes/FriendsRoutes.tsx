import { OnlyAuthRoutesProps } from '../index';
import React, { FC } from 'react';
import { Contacts } from '../../../pages/Contacts/Contacts';
import { UserModel } from '../../../store/api/session-api/session-api.types';
import { SessionInterceptor } from '../Interceptors/SessionInterceptor';

export const FriendsRoutes: FC<OnlyAuthRoutesProps> = ({ userInfo }) => {
  return (
    <SessionInterceptor userInfo={userInfo}>
      <Contacts userInfo={userInfo as UserModel} />
    </SessionInterceptor>
  );
};
