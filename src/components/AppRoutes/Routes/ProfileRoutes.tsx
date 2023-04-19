import { useAppSelector } from '@redux/hooks/hooks';
import { selectUserInfo } from '@selectors/session-selectors';
import React, { FC } from 'react';

import { SessionInterceptor } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FlexBlock } from '@components/LayoutComponents';

export const ProfileRoutes: FC = () => {
  const userInfo = useAppSelector(selectUserInfo);

  return (
    <SessionInterceptor userInfo={userInfo} mode={'show'}>
      <FlexBlock width={'100%'} grow={3} justify={'center'} align={'center'}>
        <ErrorScreen
          title={'Профили пользователей временно недоступны'}
          errorType={'BAD_REQUEST'}
          description={
            'Этот раздел находится в разработке и на данный момент недоступен для просмотра'
          }
          action={{
            title: 'Вернуться назад',
            onClick: () => history.back(),
          }}
        />
      </FlexBlock>
    </SessionInterceptor>
  );
};
