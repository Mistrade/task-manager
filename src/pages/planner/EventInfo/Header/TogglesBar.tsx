import React, { memo } from 'react';
import styled from 'styled-components';

import { disabledColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import {
  EventInfoUpdateFn,
  ToggleEventCalendar,
  ToggleEventPriority,
  ToggleEventStatus,
} from '@planner/EventInfo/SupportsComponent/ToggleTaskInformerButtons';

import { EventInfoModel } from '@api/planning-api/types/event-info.types';

export interface EventInformerTogglesProps {
  group: EventInfoModel['group'];
  priority: EventInfoModel['priority'];
  status: EventInfoModel['status'];
  updateTaskHandler: EventInfoUpdateFn;
  _id: EventInfoModel['_id'];
}

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 4px 8px;
  gap: 12px;
  border: 1px solid ${disabledColor};
  align-items: center;
  border-radius: ${borderRadiusSize.sm};
  flex-wrap: wrap;
  max-width: 100%;
`;

export const EventInformerToggles = memo<EventInformerTogglesProps>(
  ({ group, status, updateTaskHandler, priority, _id }) => {
    return (
      <Container>
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
      </Container>
    );
  },
  (prev, next) =>
    prev.group === next.group &&
    prev.status === next.status &&
    prev.priority === next.priority &&
    prev._id === next._id
);
