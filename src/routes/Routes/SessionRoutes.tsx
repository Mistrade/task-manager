import { useAppSelector } from '@redux/hooks/hooks';
import { selectUserInfo } from '@selectors/session-selectors';
import React, { FC } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { SessionInterceptor } from '@src/routes/Interceptors/SessionInterceptor';

import { WithSuspense } from '@components/Loaders/WithSuspense';

const RegistrationForm = React.lazy(() =>
  import('@components/Session/Registration').then(({ Registration }) => ({
    default: Registration,
  }))
);
const AuthorizationForm = React.lazy(() =>
  import('@components/Session/AuthorizationForm').then(
    ({ AuthorizationForm }) => ({
      default: AuthorizationForm,
    })
  )
);

export const SessionRoutes: FC = () => {
  const userInfo = useAppSelector(selectUserInfo);

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
