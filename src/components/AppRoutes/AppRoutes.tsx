import React, { FC, useCallback } from 'react';
import { Routes } from 'react-router-dom';
import { Navigate, Route } from 'react-router';
import { NotFoundPage } from './NotFoundRoutes';
import { Loader } from '../Loaders/Loader';
import { WithSuspense } from '../Loaders/WithSuspense';
import { UserModel } from '../../store/api/session-api/session-api.types';
import { ErrorScreen } from '../Errors/ErrorScreen';
import { FlexBlock } from '../LayoutComponents/FlexBlock';
import { Contacts } from '../../pages/Contacts/Contacts';

interface OnlyAuthRoutes {
  userInfo?: UserModel | null;
}

const CalendarController = React.lazy(() =>
  import('../../pages/Planner/index').then(({ PlannerController }) => ({
    default: PlannerController,
  }))
);
const RegistrationForm = React.lazy(() =>
  import('../Session/Registration').then(({ Registration }) => ({
    default: Registration,
  }))
);
const AuthorizationForm = React.lazy(() =>
  import('../Session/AuthorizationForm').then(({ AuthorizationForm }) => ({
    default: AuthorizationForm,
  }))
);

export const AppRoutes: FC<OnlyAuthRoutes> = ({ userInfo }) => {
  const goBack = useCallback(() => {
    history.back();
  }, []);

  if (userInfo) {
    return (
      <Routes>
        <Route path={'planner'}>
          <Route index element={<Navigate to={'/planner/day/in_progress'} />} />
          <Route
            path={':layout/*'}
            element={
              <React.Suspense
                fallback={
                  <Loader
                    title={'Загрузка сервиса планирования'}
                    isActive={true}
                  />
                }
              >
                <CalendarController />
              </React.Suspense>
            }
          />
        </Route>
        <Route
          path={'profile/:id'}
          element={
            <FlexBlock
              width={'100%'}
              grow={3}
              justify={'center'}
              align={'center'}
            >
              <ErrorScreen
                title={'Профили пользователей временно недоступны'}
                errorType={'BAD_REQUEST'}
                description={
                  'Этот раздел находится в разработке и на данный момент недоступен для просмотра'
                }
                action={{
                  title: 'Вернуться назад',
                  onClick: goBack,
                }}
              />
            </FlexBlock>
          }
        />
        <Route
          path={'/faq/*'}
          element={
            <FlexBlock
              width={'100%'}
              grow={3}
              justify={'center'}
              align={'center'}
            >
              <ErrorScreen
                title={'FAQ временно недоступен'}
                errorType={'BAD_REQUEST'}
                description={
                  'Этот раздел находится в разработке и на данный момент недоступен для просмотра'
                }
                action={{
                  title: 'Вернуться назад',
                  onClick: goBack,
                }}
              />
            </FlexBlock>
          }
        />
        <Route path={'contacts'}>
          <Route index element={<Contacts userInfo={userInfo} />} />
        </Route>
        <Route
          path={'*'}
          element={
            <FlexBlock
              width={'100%'}
              grow={3}
              justify={'center'}
              align={'center'}
            >
              <NotFoundPage />
            </FlexBlock>
          }
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path={'session/registration'}
        element={
          <WithSuspense title={'Загрузка формы регистрации'}>
            <RegistrationForm />
          </WithSuspense>
        }
      />
      <Route
        path={'session/login'}
        element={
          <WithSuspense title={'Загрузка формы входа в систему'}>
            <AuthorizationForm />
          </WithSuspense>
        }
      />
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
};
