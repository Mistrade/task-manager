import { FC } from 'react';
import { TaskChainItemsWrapper } from '../TaskChainItemsWrapper';
import { ChildrenEventsListProps } from '../../event-chains.types';
import { Accordion } from '../../../../../../../../components/Accordion/Accordion';
import { EventEssence } from '../../../TaskHistory/Essences/EventEssence/EventEssence';

export const ChildrenEventList: FC<ChildrenEventsListProps> = ({
  eventInfo,
  title,
  childrenEvents,
  onConnectClick,
}) => {
  if (childrenEvents && childrenEvents.length > 0) {
    return (
      <Accordion
        initialState={false}
        title={title}
        action={{
          type: 'add',
          onClick: () => {
            onConnectClick && onConnectClick();
          },
        }}
      >
        <TaskChainItemsWrapper>
          {childrenEvents.map((item) => (
            <EventEssence key={item._id} {...item} eventId={item._id} />
          ))}
        </TaskChainItemsWrapper>
      </Accordion>
    );
  }

  return <></>;
};
