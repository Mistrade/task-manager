import { FC, useCallback, useEffect } from 'react';

import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';


export const NotFoundPage: FC = () => {
  useEffect(() => {
    document.title = 'По данному URL ничего не найдено';
  }, []);

  const goBack = useCallback(() => {
    history.back();
  }, []);

  return (
    <FlexBlock height={'100%'} align={'center'} justify={'center'}>
      <ErrorScreen
        title={'По данному URL ничего не найдено.'}
        errorType={'ERR_FORBIDDEN'}
        description={
          'Такое бывает, если вы пытаетесь зайти на страницу, которая доступна только для авторизованных пользователей или наоборот.\n Воспользуйтесь навигацией сверху и перейдите в нужный раздел сайта.'
        }
        action={{
          title: 'Вернуться назад',
          onClick: goBack,
        }}
      />
    </FlexBlock>
  );
};