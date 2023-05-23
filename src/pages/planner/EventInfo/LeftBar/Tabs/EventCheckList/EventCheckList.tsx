import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { FC, useCallback, useContext } from 'react';

import { CenteredContainer } from '@src/routes/Interceptors/SessionInterceptor';

import { CheckList } from '@components/CheckList';
import { ModalContext } from '@components/LayoutComponents/Modal/Modal';
import { Loader } from '@components/Loaders/Loader';

import {
  useGetCheckListQuery,
  useUpdateCheckListMutation,
} from '@api/planning-api';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

import { SERVICES_NAMES } from '../../../../../../common/constants/enums';
import { getPath } from '../../../../../../common/functions';
import { ICheckListItem } from '../../../../types';
import { CreateEventCheckList } from './CreateEventCheckList';

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
  const { openModal } = useCreateEventModal();
  const modalContext = useContext(ModalContext);
  const layout = useAppSelector(plannerSelectLayout);
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

  const onCreateEventHandler = useCallback(
    (item: ICheckListItem) => {
      const action = () => {
        openModal(
          {
            title: item.title,
            parentId: eventInfo._id,
            group: eventInfo.group?._id,
          },
          {
            useReturnBackOnDecline: true,
            modalPath: getPath(SERVICES_NAMES.PLANNER, layout, 'event/create'),
          }
        );
      };

      if (modalContext?.closeModalAnimation) {
        modalContext.closeModalAnimation().then(action);
      } else {
        action();
      }
    },
    [layout]
  );

  if (checkListItem?.data) {
    return (
      <CheckList
        onCreateEventOfCheckListItem={onCreateEventHandler}
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
