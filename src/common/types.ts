import { ReactNode } from 'react';

import { ErrorScreenTypes } from '@components/Errors/ErrorScreen';

export type DocumentErrorTypes =
  | 'ERR_FORBIDDEN'
  | 'SYSTEM_ERROR'
  | 'BAD_REQUEST'
  | 'ERR_NOT_VALID_RESPONSE';

export type ErrorImagesType = { [key in ErrorScreenTypes]: ReactNode };
