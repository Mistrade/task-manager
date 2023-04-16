import { FC } from 'react';

import { ReplyContent } from '@components/Essences/EventEssence/event-essence.styled';

import { EventHistoryQueryResult } from '@api/planning-api/types/event-history.types';

import { HistoryCreatedAtField } from './HIstoryCreatedAtField';
import { HistoryChildOfField } from './HistoryChildOfField';
import { HistoryDescriptionField } from './HistoryDescriptionField';
import { HistoryGroupField } from './HistoryGroupField';
import { HistoryLinkField } from './HistoryLinkField';
import { HistoryPriorityField } from './HistoryPriorityField';
import { HistorySnapshotField } from './HistorySnapshotField';
import { HistoryStatusField } from './HistoryStatusField';
import { HistoryTimeField } from './HistoryTimeField';
import { HistoryTitleField } from './HistoryTitleField';


export interface EventHistoryItemControllerProps {
  historyItem: EventHistoryQueryResult;
}

export const EventHistoryItemController: FC<
  EventHistoryItemControllerProps
> = ({ historyItem }) => {
  switch (historyItem.fieldName) {
    case 'status':
      return <HistoryStatusField value={historyItem.eventSnapshot.status} />;
    case 'priority':
      return (
        <HistoryPriorityField value={historyItem.eventSnapshot.priority} />
      );
    case 'createdAt':
      return <HistoryCreatedAtField value={historyItem} />;
    case 'description':
      return (
        <ReplyContent>
          <HistoryDescriptionField
            value={historyItem.eventSnapshot.description || ''}
          />
        </ReplyContent>
      );
    case 'time':
      return <HistoryTimeField value={historyItem.eventSnapshot.time} />;
    case 'timeEnd':
      return <HistoryTimeField value={historyItem.eventSnapshot.timeEnd} />;
    case 'group':
      return (
        <HistoryGroupField value={historyItem.eventSnapshot.group || null} />
      );
    case 'insertChildOfEvents':
      return <HistoryChildOfField value={historyItem} />;
    case 'removeChildOfEvents':
      return <HistoryChildOfField value={historyItem} />;
    case 'parentEvent':
      return (
        <HistorySnapshotField value={historyItem.eventSnapshot.parentEvent} />
      );
    case 'linkedFrom':
      return (
        <HistorySnapshotField value={historyItem.eventSnapshot.linkedFrom} />
      );
    case 'link':
      return <HistoryLinkField value={historyItem.eventSnapshot.link} />;
    case 'title':
      return <HistoryTitleField value={historyItem.eventSnapshot.title} />;
    default:
      return <></>;
  }
};