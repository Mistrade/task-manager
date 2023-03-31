import React, { FC, useContext } from 'react';
import { FlexBlock } from '../../LayoutComponents/FlexBlock';
import { ErrorScreen } from '../../Errors/ErrorScreen';
import { SessionInterceptor } from '../Interceptors/SessionInterceptor';
import { UserInfoContext } from '../../../Context/userInfo.context';

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
