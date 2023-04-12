import React, { FC, useContext } from 'react';
import { UserInfoContext } from '@src/Context/userInfo.context';
import { SessionInterceptor } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ErrorScreen } from '@components/Errors/ErrorScreen';

export const ProfileRoutes: FC = () => {
  const userInfo = useContext(UserInfoContext);

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
