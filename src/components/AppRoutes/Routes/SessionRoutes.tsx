import { Route } from 'react-router';
import { SessionInterceptor } from '../Interceptors/SessionInterceptor';
import { WithSuspense } from '../../Loaders/WithSuspense';
import React, { FC } from 'react';
import { Routes } from 'react-router-dom';
import { OnlyAuthRoutesProps } from '../index';

const RegistrationForm = React.lazy(() =>
  import('../../Session/Registration').then(({ Registration }) => ({
    default: Registration,
  }))
);
const AuthorizationForm = React.lazy(() =>
  import('../../Session/AuthorizationForm').then(({ AuthorizationForm }) => ({
    default: AuthorizationForm,
  }))
);

export const SessionRoutes: FC<OnlyAuthRoutesProps> = ({ userInfo }) => {
  return (
    <Routes>
      <Route
        path={'registration'}
        element={
          <SessionInterceptor userInfo={userInfo} mode={'hide'}>
            <WithSuspense title={'Загрузка формы регистрации'}>
              <RegistrationForm />
            </WithSuspense>
          </SessionInterceptor>
        }
      />
      <Route
        path={'login'}
        element={
          <SessionInterceptor userInfo={userInfo} mode={'hide'}>
            <WithSuspense title={'Загрузка формы входа в систему'}>
              <AuthorizationForm />
            </WithSuspense>
          </SessionInterceptor>
        }
      />
    </Routes>
  );
};