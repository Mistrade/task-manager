import { ChildrenEventList } from './ChildrenEventList';
import { Accordion } from '@components/Accordion/Accordion';
import { FlexBlock } from '@components/LayoutComponents';
import { ChainsRenderModeProps } from '@planner/EventInfo/LeftBar/Tabs/Chains/event-chains.types';
import { FC } from 'react';


export const ChainsRenderModeList: FC<ChainsRenderModeProps> = ({
  eventItem,
  chains,
  onConnectChains,
}) => {
  return (
    <FlexBlock
      direction={'column'}
      gap={12}
      justify={'flex-start'}
      align={'flex-start'}
      pb={20}
    >
      <Accordion title={'Дочерние события'}>
        <ChildrenEventList childrenEvents={chains.childrenEvents || []} />
      </Accordion>
      <Accordion title={'Родительские события'}>
        <ChildrenEventList
          childrenEvents={chains.parentEvent ? [chains.parentEvent] : []}
        />
      </Accordion>
      <Accordion title={'События доноры'}>
        <ChildrenEventList
          childrenEvents={
            chains.linkedFromEvent ? [chains.linkedFromEvent] : []
          }
        />
      </Accordion>
    </FlexBlock>
  );
};