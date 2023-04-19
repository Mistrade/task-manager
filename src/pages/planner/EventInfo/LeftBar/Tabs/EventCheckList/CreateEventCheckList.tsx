import { FC } from 'react';

import { ErrorScreen } from '@components/Errors/ErrorScreen';

import { useCreateCheckListMutation } from '@api/planning-api';
import { ObjectId } from '@api/rtk-api.types';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';


export interface CreateEventCheckList {
  eventId: ObjectId;
  onSuccessCreateCheckList?: () => Promise<void>;
}

export const CreateEventCheckList: FC<CreateEventCheckList> = ({
  eventId,
  onSuccessCreateCheckList,
}) => {
  const [create, { isLoading }] = useCreateCheckListMutation();

  return (
    <ErrorScreen
      title={'Чек-лист не найден'}
      errorType={'BAD_REQUEST'}
      description={
        'К данному событию еще не прикреплен чек-лист, вы можете легко это исправить, создав его прямо сейчас'
      }
      action={{
        title: 'Создать Чек-Лист',
        async onClick() {
          create({
            title: 'Чек-лист',
            eventId,
            data: [],
          })
            .unwrap()
            .then((data) => thenHandleForToast(data, onSuccessCreateCheckList))
            .catch(CatchHandleForToast);
        },
        isLoading,
      }}
    />
  );
};