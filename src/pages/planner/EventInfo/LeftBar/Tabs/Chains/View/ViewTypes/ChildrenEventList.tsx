import { TaskChainItemsWrapper } from '../TaskChainItemsWrapper';
import { EventEssence } from '@components/Essences/EventEssence/EventEssence';
import { ChildrenEventsListProps } from '@planner/EventInfo/LeftBar/Tabs/Chains/event-chains.types';
import { FC } from 'react';


export const ChildrenEventList: FC<ChildrenEventsListProps> = ({
  emptyComponent,
  childrenEvents,
}) => {
  if (childrenEvents && childrenEvents.length > 0) {
    return (
      <TaskChainItemsWrapper>
        {childrenEvents.map((item) => (
          <EventEssence key={item._id} {...item} eventId={item._id} />
        ))}
      </TaskChainItemsWrapper>
    );
  }

  return <>{emptyComponent || null}</>;
};