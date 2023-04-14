import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import {
  EventInfoUpdateFn,
  ToggleEventCalendar,
  ToggleEventPriority,
  ToggleEventStatus,
} from '@planner/TaskInformer/SupportsComponent/ToggleTaskInformerButtons';
import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { disabledColor } from '@src/common/constants';
import React, { memo } from 'react';

export interface EventInformerTogglesProps {
  group: EventInfoModel['group'];
  priority: EventInfoModel['priority'];
  status: EventInfoModel['status'];
  updateTaskHandler: EventInfoUpdateFn;
  _id: EventInfoModel['_id'];
}

export const EventInformerToggles = memo<EventInformerTogglesProps>(
  ({ group, status, updateTaskHandler, priority, _id }) => {
    return (
      <FlexBlock
        gap={12}
        p={`4px 8px`}
        border={`1px solid ${disabledColor}`}
        align={'center'}
        borderRadius={borderRadiusSize.sm}
      >
        <ToggleEventCalendar
          elementId={`set_event_group_${_id}`}
          value={group}
          onChange={updateTaskHandler}
        />
        <ToggleEventPriority
          elementId={`set_event_priority_${_id}`}
          value={priority}
          onChange={updateTaskHandler}
        />
        <ToggleEventStatus
          elementId={`set_event_status_${_id}`}
          value={status}
          onChange={updateTaskHandler}
        />
      </FlexBlock>
    );
  },
  (prev, next) =>
    prev.group === next.group &&
    prev.status === next.status &&
    prev.priority === next.priority &&
    prev._id === next._id
);
