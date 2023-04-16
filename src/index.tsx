import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './style.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>

  <App />
  // </React.StrictMode>
);
export { FRIENDS_ROUTES_PAGE_NAMES } from '@src/common/constants';
export { FRIENDS_ROUTES } from '@src/common/constants';