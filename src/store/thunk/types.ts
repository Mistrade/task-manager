export type ThunkErrorCodes =
  | 'SERVER_ERROR'
  | 'VALIDATION_ERROR'
  | 'BAD_REQUEST'
  | 'FORBIDDEN'
  | 'UNAUTHORIZED'
  | 'SYSTEM_ERROR';

export interface ThunkErrorObject {
  message: string;
  errorCode: ThunkErrorCodes;
}
