import { createContext } from 'react';
import { UserModel } from '../store/api/session-api/session-api.types';

export const UserInfoContext = createContext<null | undefined | UserModel>(
  null
);
