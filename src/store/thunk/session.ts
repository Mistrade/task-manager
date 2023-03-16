import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkErrorObject } from './types';
import { api } from '../../Api/api';
import { RegUserRequestProps } from '../api/session-api/session-api.types';

export type RegistrationNextAction = 'login' | 'try_again';

export const RegistrationUser = createAsyncThunk<
  RegistrationNextAction,
  { data: RegUserRequestProps },
  { rejectValue: ThunkErrorObject }
>('session/registration', async ({ data }, thunkApi) => {
  const res = await api.post<{ message?: string }>(
    '/session/reg',
    {
      phone: data.phone,
      password: data.password,
    },
    {
      method: 'POST',
    }
  );

  if (res.status >= 400) {
    return thunkApi.rejectWithValue({
      message: res.data.message || 'Произошла ошибка',
      errorCode: 'SERVER_ERROR',
    });
  }

  return 'login';
});

interface AuthFields {
  phone: string;
  password: string;
}

export const AuthorizationUser = createAsyncThunk<
  boolean,
  AuthFields,
  { rejectValue: ThunkErrorObject }
>('session/login', async ({ password, phone }, thunkApi) => {
  const res = await api.post<{ message?: string }>('/session/auth', {
    phone,
    password,
  });

  if (res.status === 200) {
    return true;
  }

  return thunkApi.rejectWithValue({
    message: res.data.message || 'Не удалось авторизовать пользователя',
    errorCode: 'SYSTEM_ERROR',
  });
});

export const CheckUserSession = createAsyncThunk<
  boolean,
  void,
  { rejectValue: ThunkErrorObject }
>('session/check_session', async (_, thunkApi) => {
  const res = await api.post('/session/confirm');

  return res.status === 200;
});
