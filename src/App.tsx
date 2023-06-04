import ToastController from '@components/hocks/Toast';
import { AppEntryPoint } from '@pages/index';
import { GlobalTooltipStyled } from 'chernikov-kit';
import React from 'react';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle, css } from 'styled-components';


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

    *::-webkit-scrollbar {
      display: none;
    }

    * {
      -ms-overflow-style: none; /* IE и Edge */
      scrollbar-width: none; /* Firefox */
      overscroll-behavior: contain;
      -ms-scroll-chaining: none;
    }
  `
);

function App() {
  return (
    <>
      <Helmet title={'White Planner - современный сервис планирования.'} />
      <GlobalStyled />
      <AppEntryPoint />
      <GlobalTooltipStyled />
      <ToastController />
    </>
  );
}

export default App;