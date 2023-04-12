import { CancelIcon, CompleteIcon } from '@components/Icons/Icons';
import { currentColor } from '@src/common/constants';
import { toast } from 'react-toastify';
import { CustomRtkError, MyServerResponse } from './rtk-api.types';

export function CatchHandleForToast<T>(reason: any | CustomRtkError<T>) {
  console.error(reason);

  if ('data' in reason && 'status' in reason) {
    const e: CustomRtkError<T> = reason as CustomRtkError<T>;
    const info = e.data.info;
    if (info) {
      toast(info.message, {
        type: info.type,
        pauseOnHover: true,
        theme: 'light',
        icon: <CancelIcon color={'red'} size={20} />,
      });
    }
  }
}

export const thenHandleForToast = (
  data: MyServerResponse<any>,
  callback?: () => any
) => {
  console.log(data);

  if (data.info) {
    toast(data.info.message, {
      type: data.info.type,
      pauseOnHover: true,
      theme: 'light',
      icon: <CompleteIcon color={currentColor} size={20} />,
    });
  }

  callback && callback();
};
