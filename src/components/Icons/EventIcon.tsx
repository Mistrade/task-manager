import React, { FC } from 'react';
import {
  ArchiveIcon,
  CompleteIcon,
  CreatedIcon,
  IconProps,
  ProcessIcon,
  ReviewIcon,
} from '@components/Icons/Icons';
import { FlexBlockProps } from '@components/LayoutComponents/FlexBlock';
import { ListIcon } from '@components/Icons/AppIcon/ListIcon';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { EventFilterTaskStatuses } from '@planner/RenderModes/FindEventFilter/find-event-filters.types';

export const EventIcon: FC<
  IconProps &
    FlexBlockProps & {
      status: EventInfoModel['status'] | EventFilterTaskStatuses;
    }
> = ({ ...props }) => {
  switch (props.status) {
    case 'created':
      return <CreatedIcon {...props} />;
    case 'in_progress':
      return <ProcessIcon {...props} />;
    case 'in_work':
      return <ProcessIcon {...props} />;
    case 'review':
      return <ReviewIcon {...props} />;
    case 'completed':
      return <CompleteIcon {...props} />;
    case 'archive':
      return <ArchiveIcon {...props} />;
    case 'all':
      return <ListIcon {...props} />;
    default:
      return <ListIcon {...props} />;
  }
};
