import { FC } from 'react';
import { FlexBlock } from '../../../../../../../components/LayoutComponents/FlexBlock';
import { BaseEventHistoryFieldProps } from '../event-history.types';
import { EventEssence } from '../Essences/EventEssence/EventEssence';

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
