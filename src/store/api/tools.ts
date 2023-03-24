import { CustomRtkError, MyServerResponse } from './rtk-api.types';
import { toast } from 'react-toastify';

export const CatchHandleForToast = <T>(reason: any | CustomRtkError<T>) => {
  console.error(reason);

  if ('data' in reason && 'status' in reason) {
    const e: CustomRtkError<T> = reason as CustomRtkError<T>;
    const info = e.data.info;
    if (info) {
      toast(info.message, {
        type: info.type,
        pauseOnHover: true,
        theme: 'light',
      });
    }
  }
};

export const thenHandleForToast = (
  data: MyServerResponse<any>,
  callback?: () => void
) => {
  console.log(data);

  if (data.info) {
    toast(data.info.message, {
      type: data.info.type,
      pauseOnHover: true,
      theme: 'light',
      icon: true,
      position: 'bottom-left',
    });
  }

  callback && callback();
};
