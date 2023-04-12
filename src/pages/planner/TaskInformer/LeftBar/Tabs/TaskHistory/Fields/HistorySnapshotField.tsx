import { BaseEventHistoryFieldProps } from '../event-history.types';
import { FC } from 'react';
import { EventEssence } from '@components/Essences/EventEssence/EventEssence';
import { QuerySnapshotRequiredFields } from '@api/planning-api/types/event-history.types';

export const HistorySnapshotField: FC<
  BaseEventHistoryFieldProps<QuerySnapshotRequiredFields | null | undefined>
> = ({ value: snapshot }) => {
  if (!snapshot) {
    return <></>;
  }

  return (
    <EventEssence
      isSnapshot={true}
      title={snapshot.title}
      eventId={snapshot.originalEventId}
      createdAt={snapshot.createdAt}
      status={snapshot.status}
      priority={snapshot.priority}
    />
  );
};
