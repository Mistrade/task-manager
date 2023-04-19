import { useCreateEventModal } from '@hooks/useCreateEventModal';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import dayjs from 'dayjs';
import React, { FC, useCallback } from 'react';

import { SERVICES_NAMES } from '@src/common/constants/enums';
import { TASK_STATUSES } from '@src/common/constants/signatures';
import { getPath } from '@src/common/functions';

import { TransparentButton } from '@components/Buttons/Buttons.styled';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { EventInfoModalProps } from '@planner/planner.types';

import {
  useRemoveEventMutation,
  useUpdateTaskMutation,
} from '@api/planning-api';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';


export interface TaskInformerMoreActionsProps extends EventInfoModalProps {
  taskItem: EventInfoModel;
}

export const TaskInformerMoreActions: FC<TaskInformerMoreActionsProps> = ({
  taskItem,
}) => {
  const [removeEvent] = useRemoveEventMutation();
  const [updEvent] = useUpdateTaskMutation();
  const layout = useAppSelector(plannerSelectLayout);
  const navigate = useSearchNavigate();

  const { openModal: openCreateEventModal } = useCreateEventModal();

  const cloneEventHandler = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const time = dayjs(taskItem.time);
      const timeEnd = dayjs(taskItem.timeEnd);

      taskItem &&
        openCreateEventModal(
          {
            title: `Clone: ${taskItem.title}`,
            linkedFrom: taskItem._id,
            description: `Событие было клонировано от события: "${taskItem.title}".\n`,
            time: time.isValid() ? time.format() : undefined,
            timeEnd: timeEnd.isValid() ? timeEnd.format() : undefined,
            parentId: taskItem.parentId,
            status: taskItem.status,
            link: taskItem.link,
            priority: taskItem.priority,
          },
          {
            modalPath: getPath(SERVICES_NAMES.PLANNER, layout, 'event/create'),
            useReturnBackOnDecline: true,
          }
        );
    },
    [taskItem, openCreateEventModal, layout]
  );

  const createChildEventHandler = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      taskItem &&
        openCreateEventModal(
          {
            group: taskItem.group?._id || '',
            title: 'Child Event: ',
            parentId: taskItem._id,
            description: `Событие было создано как дочернее для: "${taskItem.title}".\n`,
          },
          {
            useReturnBackOnDecline: true,
            modalPath: getPath(SERVICES_NAMES.PLANNER, layout, 'event/create'),
          }
        );
    },
    [taskItem, openCreateEventModal, layout]
  );

  const completeEventHandler = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      taskItem &&
        updEvent({
          id: taskItem._id,
          field: 'status',
          data: TASK_STATUSES['completed'].key,
        }).unwrap();
    },
    [updEvent, taskItem]
  );

  const removeEventHandler = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      taskItem &&
        removeEvent({ eventId: taskItem._id })
          .unwrap()
          .then((r) => {
            thenHandleForToast(
              r,
              () =>
                r?.info?.type === 'success' &&
                navigate(`/${SERVICES_NAMES.PLANNER}/${layout}`)
            );
          })
          .catch(CatchHandleForToast);
    },
    [removeEvent, taskItem]
  );

  return (
    <Tooltip
      theme={'light'}
      trigger={'click'}
      placement={'bottom'}
      offset={[0, 10]}
      interactive={true}
      interactiveBorder={20}
      hideOnClick={true}
      delay={100}
      content={
        <SelectListContainer>
          <SelectItemContainer onClick={cloneEventHandler}>
            Клонировать
          </SelectItemContainer>
          <SelectItemContainer onClick={createChildEventHandler}>
            Создать вложенное
          </SelectItemContainer>
          <SelectItemContainer onClick={completeEventHandler}>
            Завершить
          </SelectItemContainer>
          <SelectItemContainer onClick={removeEventHandler}>
            Удалить
          </SelectItemContainer>
        </SelectListContainer>
      }
    >
      <TransparentButton
        id={'123'}
        onClick={(e) => e.stopPropagation()}
        type={'button'}
      >
        Скрытые действия
      </TransparentButton>
    </Tooltip>
  );
};