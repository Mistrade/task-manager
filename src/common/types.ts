import { ReactNode } from 'react';

export type DocumentErrorTypes =
  | 'ERR_FORBIDDEN'
  | 'SYSTEM_ERROR'
  | 'BAD_REQUEST'
  | 'ERR_NOT_VALID_RESPONSE';

export type ErrorImagesType = { [key in DocumentErrorTypes]: ReactNode };