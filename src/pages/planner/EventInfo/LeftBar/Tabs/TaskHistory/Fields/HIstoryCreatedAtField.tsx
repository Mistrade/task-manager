import { FC } from 'react';

import { EventEssence } from '@components/Essences/EventEssence/EventEssence';
import { FlexBlock } from '@components/LayoutComponents';

import { BaseEventHistoryFieldProps } from '../event-history.types';


export const HistoryCreatedAtField: FC<BaseEventHistoryFieldProps> = ({
  value,
}) => {
  return (
    <FlexBlock width={'100%'} pb={4}>
      <EventEssence
        isSnapshot={true}
        status={value.eventSnapshot.status}
        priority={value.eventSnapshot.priority}
        createdAt={value.eventSnapshot.createdAt}
        title={value.eventSnapshot.title}
        description={value.eventSnapshot.description}
        time={value.eventSnapshot.time}
        timeEnd={value.eventSnapshot.timeEnd}
      />
    </FlexBlock>
  );
};