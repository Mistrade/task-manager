import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import './common/dayjs';
import { FlexBlock } from './components/LayoutComponents/FlexBlock';
import { MainHeader } from './components/LayoutComponents/MainHeader/MainHeader';
import { AppRoutes } from './components/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/animations/shift-away.css';
import { TooltipStyled } from './components/Tooltip/Tooltip.styled';
import { pageHeaderColor } from './common/constants';
import { UserInfoProvider } from './components/ContextProviders/UserInfoProvider';

const GlobalStyled = createGlobalStyle(
  {},
  css`
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
  flex-grow: 3;
  background-color: ${pageHeaderColor};
  flex-direction: row;
  overflow: hidden;
`;

function App() {
  return (
    <UserInfoProvider>
      <FlexBlock width={'100%'} direction={'column'} height={'100vh'}>
        <GlobalStyled />
        <TooltipStyled />
        <MainHeader />
        <AppContainer>
          <AppRoutes />
        </AppContainer>
      </FlexBlock>
      <ToastContainer
        pauseOnHover={true}
        position={'top-right'}
        autoClose={2000}
        limit={2}
        newestOnTop={true}
      />
    </UserInfoProvider>
  );
}

export default App;
