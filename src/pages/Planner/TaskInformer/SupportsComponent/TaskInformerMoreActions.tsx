import { SelectListContainer } from '../../../../components/Input/SelectInput/SelectListContainer';
import { SelectItemContainer } from '../../../../components/Input/SelectInput/SelectItemContainer';
import { TASK_STATUSES } from '../../../../common/constants';
import { toast } from 'react-toastify';
import React, { FC } from 'react';
import { EventInfoModel } from '../../../../store/api/planning-api/types/event-info.types';
import {
  useRemoveEventMutation,
  useUpdateTaskMutation,
} from '../../../../store/api/planning-api';
import { EventInfoModalProps } from '../../planner.types';
import { TransparentButton } from '../../../../components/Buttons/Buttons.styled';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';

export interface TaskInformerMoreActionsProps extends EventInfoModalProps {
  taskItem: EventInfoModel;
}

export const TaskInformerMoreActions: FC<TaskInformerMoreActionsProps> = ({
  taskItem,
  onClose,
  onCloneEvent,
  onOpenClonedEvent,
}) => {
  const [
    removeTask,
    { data: removeTaskData, isLoading: isFetchingRemoveTask },
  ] = useRemoveEventMutation();
  const [
    updateTask,
    { data: updateTaskData, isLoading: isFetchingUpdateTask },
  ] = useUpdateTaskMutation();
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
          <SelectItemContainer
            onClick={(e) => {
              e.stopPropagation();
              taskItem &&
                onCloneEvent &&
                onCloneEvent({
                  ...taskItem,
                  linkedFrom: taskItem._id,
                  title: `CLONE - ${taskItem.title}`,
                });
            }}
          >
            Клонировать
          </SelectItemContainer>
          <SelectItemContainer
            onClick={(e) => {
              e.stopPropagation();
              taskItem &&
                onCloneEvent &&
                onCloneEvent({
                  group: taskItem.group,
                  title: `ChildOf`,
                  parentId: taskItem._id,
                });
            }}
          >
            Создать вложенное
          </SelectItemContainer>
          <SelectItemContainer
            onClick={(e) => {
              e.stopPropagation();
              taskItem &&
                updateTask({
                  id: taskItem._id,
                  field: 'status',
                  data: TASK_STATUSES['completed'].key,
                }).unwrap();
            }}
          >
            Завершить
          </SelectItemContainer>
          <SelectItemContainer
            onClick={(e) => {
              e.stopPropagation();
              taskItem &&
                removeTask({ eventId: taskItem._id })
                  .unwrap()
                  .then((r) => {
                    if (r.info) {
                      toast(r.info.message, {
                        type: r.info.type || 'info',
                      });
                    }
                    r?.info?.type === 'success' && onClose && onClose();
                  });
            }}
          >
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
