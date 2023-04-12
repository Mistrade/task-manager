import { AppRoutes } from '@components/AppRoutes';
import { UserInfoProvider } from '@components/ContextProviders/UserInfoProvider';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { MainHeader } from '@components/LayoutComponents/MainHeader/MainHeader';
import { TooltipStyled } from '@components/Tooltip/Tooltip.styled';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled, { createGlobalStyle, css } from 'styled-components';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';
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
        autoClose={2000}
        limit={2}
        newestOnTop={true}
      />
    </>
  );
}

export default App;
