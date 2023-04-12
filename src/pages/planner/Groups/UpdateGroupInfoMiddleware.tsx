import { CreateOrUpdateGroupModal } from './CreateOrUpdateGroup';
import { FC, useEffect } from 'react';
import { useGetGroupInfoQuery } from '@api/planning-api';
import { toast } from 'react-toastify';
import { UpdateGroupInfoMiddlewareProps } from './groups.types';

export const UpdateGroupInfoMiddleware: FC<UpdateGroupInfoMiddlewareProps> = ({
  groupId,
  onClose,
}) => {
  const { currentData, isError, isSuccess } = useGetGroupInfoQuery(groupId);

  useEffect(() => {
    if (isError) {
      if (currentData?.info) {
        toast(currentData?.info?.message, {
          type: currentData.info.type,
        });
      } else {
        toast('Серверу не удалось найти информацию по выбранному календарю', {
          type: 'warning',
        });
      }
      onClose && onClose();
    }
  }, [isError, currentData]);

  if (isSuccess) {
    return (
      <CreateOrUpdateGroupModal
        initialValues={
          currentData?.data
            ? {
                groupId: currentData.data._id,
                title: currentData.data.title,
                color: currentData.data.color,
              }
            : undefined
        }
        onClose={onClose}
        isEditing={true}
      />
    );
  }

  return <></>;
};
