import { Route } from 'react-router';
import React, { FC, useContext } from 'react';
import { Routes } from 'react-router-dom';
import { UserInfoContext } from '@src/Context/userInfo.context';
import { SessionInterceptor } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { WithSuspense } from '@components/Loaders/WithSuspense';

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

export const SessionRoutes: FC = () => {
  const userInfo = useContext(UserInfoContext);

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
