import { ErrorScreen } from '../../Errors/ErrorScreen';
import { FlexBlock } from '../../LayoutComponents/FlexBlock';
import React from 'react';

export const FaqRoutes = () => {
  return (
    <FlexBlock width={'100%'} grow={3} justify={'center'} align={'center'}>
      <ErrorScreen
        title={'FAQ временно недоступен'}
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
  );
};
