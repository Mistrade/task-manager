import { FC } from 'react';
import styled from 'styled-components';

import { ErrorScreen } from '@components/Errors/ErrorScreen';

const Container = styled('div')`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const TaskInfoNotFound: FC<{ message?: string }> = ({ message }) => (
  <Container>
    <ErrorScreen
      title={'Не удалось загрузить информацию по событию'}
      errorType={'SYSTEM_ERROR'}
      description={message || ''}
      action={{
        title: 'Вернуться назад',
        onClick() {
          history.back();
        },
      }}
    />
  </Container>
);
