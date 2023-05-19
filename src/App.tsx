import React from 'react';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle, css } from 'styled-components';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';

import { TooltipStyled } from '@components/Tooltip/Tooltip.styled';
import ToastController from '@components/hocks/Toast';

import { AppEntryPoint } from '@pages/index';

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
    }
  `
);

function App() {
  return (
    <>
      <Helmet title={'White Planner - современный сервис планирования.'} />
      <GlobalStyled />
      <AppEntryPoint />
      <TooltipStyled />
      <ToastController />
    </>
  );
}

export default App;
