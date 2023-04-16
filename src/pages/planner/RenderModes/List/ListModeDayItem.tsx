import { FC } from 'react';

import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';

interface ListModeDayItemProps {
  tasks: Array<ShortEventInfoModel>;
}

export const ListModeDayItem: FC<ListModeDayItemProps> = ({ tasks }) => {
  if (tasks.length > 0) {
    return <></>;
  }
  return <></>;
};