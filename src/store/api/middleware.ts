import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    console.log(action);
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!');
      toast('123', {
        type: 'error',
        pauseOnHover: true,
        theme: 'light',
        // icon: <CompleteIcon color={kitColors.primary} size={20} />,
      });
    }

    return next(action);
  };