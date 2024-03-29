import React, { FC, ReactNode, useCallback } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { AuthorizationForm } from '@components/Session/AuthorizationForm';

import { UserModel } from '@api/session-api/session-api.types';

export const CenteredContainer = styled('div')`
  & {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export const SessionInterceptor: FC<{
  userInfo?: UserModel | null;
  children: ReactNode;
  mode?: 'hide' | 'show';
}> = ({ userInfo, children, mode = 'show' }) => {
  const location = useLocation();

  const goBack = useCallback(() => {
    history.back();
  }, []);

  if (mode === 'show') {
    if (userInfo) {
      return <>{children}</>;
    }

    return (
      <AuthorizationForm prevUrl={`${location.pathname}${location.search}`} />
    );
  }

  if (mode === 'hide') {
    if (userInfo) {
      return (
        <CenteredContainer>
          <ErrorScreen
            title={'Содержимое недоступно авторизованным пользователям'}
            errorType={'ERR_FORBIDDEN'}
            action={{
              title: 'Вернуться назад',
              onClick: goBack,
            }}
          />
        </CenteredContainer>
      );
    }

    return <>{children}</>;
  }

  return (
    <CenteredContainer>
      <ErrorScreen
        title={'Не удалось отобразить запрашиваемый ресурс'}
        errorType={'BAD_REQUEST'}
        action={{
          title: 'Вернуться назад',
          onClick: goBack,
        }}
      />
    </CenteredContainer>
  );
};
