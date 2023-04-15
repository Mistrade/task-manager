import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { FC, useCallback } from 'react';
import { CheckList } from '@components/CheckList';
import { CreateEventCheckList } from './CreateEventCheckList';
import {
  useGetCheckListQuery,
  useUpdateCheckListMutation,
} from '@api/planning-api';
import { CenteredContainer } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { Loader } from '@components/Loaders/Loader';
import {
  CatchHandleForToast,
  thenHandleForToast,
} from '@api/tools';

export interface EventCheckListProps {
  eventInfo: EventInfoModel;
}

export const EventCheckList: FC<EventCheckListProps> = ({ eventInfo }) => {
  const {
    currentData: checkListItem,
    isFetching,
    refetch,
    isLoading,
  } = useGetCheckListQuery(
    { eventId: eventInfo._id },
    { skip: !eventInfo._id }
  );
  const [update, { isLoading: isMutationLoading }] =
    useUpdateCheckListMutation();

  const refetchHandler = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const changeTitleHandler = useCallback(
    async (title: string): Promise<any> => {
      if (checkListItem?.data?._id) {
        return await update({
          fieldName: 'title',
          data: title,
          _id: checkListItem.data._id,
        })
          .unwrap()
          .then(thenHandleForToast)
          .catch(CatchHandleForToast);
      }
    },
    [eventInfo._id, checkListItem?.data?._id]
  );

  // const itemChangeHandler = useCallback(() => {}, []);

  if (checkListItem?.data) {
    return (
      <CheckList
        isLoading={isLoading || isMutationLoading}
        checkList={checkListItem.data.data || []}
        title={checkListItem.data.title}
        onRemoveItem={async (item) => {
          if (checkListItem?.data?._id) {
            await update({
              fieldName: 'delete',
              _id: checkListItem.data._id,
              data: item._id,
            })
              .unwrap()
              .then(thenHandleForToast)
              .catch(CatchHandleForToast);
          }
          return true;
        }}
        onSaveNewElement={async (title) => {
          if (checkListItem?.data?._id) {
            return await update({
              fieldName: 'create',
              _id: checkListItem.data?._id,
              data: {
                title,
                state: false,
              },
            })
              .unwrap()
              .then((value: any) => {
                thenHandleForToast(value);
                return true;
              })
              .catch((reason) => {
                CatchHandleForToast(reason);
                return false;
              });
          }

          return false;
        }}
        onChangeTitle={changeTitleHandler}
        onItemChange={async (item, field) => {
          if (checkListItem.data?._id) {
            let response: Promise<any> | null = null;

            if (field === 'item-state') {
              response = update({
                fieldName: field,
                data: {
                  itemId: item._id,
                  value: item.state,
                },
                _id: checkListItem.data._id,
              }).unwrap();
            } else if (field === 'item-title') {
              response = update({
                fieldName: field,
                data: {
                  itemId: item._id,
                  value: item.title,
                },
                _id: checkListItem.data._id,
              }).unwrap();
            }

            return !!response
              ?.then((value) => {
                thenHandleForToast(value);
                return true;
              })
              .catch((err) => {
                CatchHandleForToast(err);
                return false;
              });
          }
          return true;
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <CenteredContainer>
        <Loader isActive={true} title={'Загрузка чек-листа'} />
      </CenteredContainer>
    );
  }

  return (
    <CreateEventCheckList
      eventId={eventInfo._id}
      onSuccessCreateCheckList={refetchHandler}
    />
  );
};