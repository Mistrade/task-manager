import React, { FC } from 'react';
import { OnlyAuthRoutesProps } from '../index';
import { FlexBlock } from '../../LayoutComponents/FlexBlock';
import { ErrorScreen } from '../../Errors/ErrorScreen';
import { SessionInterceptor } from '../Interceptors/SessionInterceptor';

export const ProfileRoutes: FC<OnlyAuthRoutesProps> = ({ userInfo }) => {
  return (
    <SessionInterceptor userInfo={userInfo}>
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
