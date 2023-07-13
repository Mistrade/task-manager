import { store } from '@redux/index';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import { UserInfoProvider } from '@components/ContextProviders/UserInfoProvider';
import { MainHeader } from '@components/LayoutComponents';

import { AppRoutes } from '../routes';

const AppContainer = styled('main')`
  display: flex;
  height: 100%;
  background-color: #fff;
  flex-direction: column;
`;

const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  overflow: hidden;
`;

const VerticalContainer = styled('main')`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const RoutesContainer = () => {
  return (
    <MainContainer>
      <VerticalContainer>
        <AppRoutes />
      </VerticalContainer>
    </MainContainer>
  );
};

export const AppEntryPoint = () => {
  return (
    <Provider store={store}>
      <UserInfoProvider>
        <BrowserRouter>
          <AppContainer>
            <MainHeader />
            <RoutesContainer />
          </AppContainer>
        </BrowserRouter>
      </UserInfoProvider>
    </Provider>
  );
};
