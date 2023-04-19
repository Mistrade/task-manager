import React from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled, { createGlobalStyle, css } from 'styled-components';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';

import { AppRoutes } from '@src/routes';

import { UserInfoProvider } from '@components/ContextProviders/UserInfoProvider';
import { FlexBlock } from '@components/LayoutComponents';
import { MainHeader } from '@components/LayoutComponents/PageHeader';
import { TooltipStyled } from '@components/Tooltip/Tooltip.styled';

import './common/dayjs';
import { store } from './store';

const GlobalStyled = createGlobalStyle(
  {},
  css`
    html,
    body,
    #root {
      height: 100%;
      overflow: hidden;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', sans-serif;
    }
  `
);

const AppContainer = styled('main')`
  display: flex;
  height: 100%;
  background-color: #fff;
  flex-direction: column;
`;

function App() {
  return (
    <>
      <Helmet title={'White Planner - современный сервис планирования.'} />
      <GlobalStyled />
      <TooltipStyled />
      <Provider store={store}>
        <UserInfoProvider>
          <BrowserRouter>
            <AppContainer>
              <MainHeader />
              <FlexBlock
                direction={'column'}
                basis={'100%'}
                overflow={'hidden'}
              >
                <FlexBlock
                  direction={'column'}
                  height={'100%'}
                  overflow={'hidden'}
                >
                  <AppRoutes />
                </FlexBlock>
              </FlexBlock>
            </AppContainer>
          </BrowserRouter>
        </UserInfoProvider>
      </Provider>
      <ToastContainer
        pauseOnHover={true}
        position={'top-right'}
        autoClose={3500}
        limit={5}
        newestOnTop={true}
      />
    </>
  );
}

export default App;
