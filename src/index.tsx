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
export {FRIEND_REQUEST_ACCEPT_STATUSES} from "@src/common/constants/enums";
export {FRIEND_REQUESTS_TYPES} from "@src/common/constants/enums";