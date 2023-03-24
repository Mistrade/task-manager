import React from 'react';
import { createGlobalStyle, css } from 'styled-components';
import './common/dayjs';
import { FlexBlock } from './components/LayoutComponents/FlexBlock';
import { MainHeader } from './components/LayoutComponents/MainHeader/MainHeader';
import { AppRoutes } from './components/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConfirmSessionQuery } from './store/api/session-api';
import { Loader } from './components/Loaders/Loader';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/animations/shift-away.css';
import { TooltipStyled } from './components/Tooltip/Tooltip.styled';
import { pageHeaderColor } from './common/constants';

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

function App() {
  const { data: userInfo, isFetching, isError } = useConfirmSessionQuery();

  return (
    <>
      <Loader title={'Проверка сессии пользователя...'} isActive={isFetching}>
        <FlexBlock width={'100%'} direction={'column'} height={'100vh'}>
          <GlobalStyled />
          <TooltipStyled />
          <MainHeader
            userInfo={isError ? undefined : userInfo?.data}
            msOptions={{
              calendar: { renderWeekPattern: 'full' },
            }}
          />
          <FlexBlock
            grow={3}
            direction={'row'}
            bgColor={pageHeaderColor}
            overflow={'hidden'}
          >
            <AppRoutes userInfo={isError ? undefined : userInfo?.data} />
          </FlexBlock>
        </FlexBlock>
      </Loader>
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
