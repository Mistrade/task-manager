import { FC } from 'react';

import { Accordion } from '@components/Accordion/Accordion';
import { EventEssence } from '@components/Essences/EventEssence/EventEssence';

import { ChildrenEventsListProps } from '@planner/TaskInformer/LeftBar/Tabs/Chains/event-chains.types';

import { TaskChainItemsWrapper } from '../TaskChainItemsWrapper';


export const ChildrenEventList: FC<ChildrenEventsListProps> = ({
  eventInfo,
  title,
  childrenEvents,
  onConnectClick,
}) => {
  if (childrenEvents && childrenEvents.length > 0) {
    return (
      <Accordion
        initialState={true}
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