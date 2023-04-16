import { FC } from 'react';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { EventChainItemsWrapperProps } from '../event-chains.types';


export const TaskChainItemsWrapper: FC<EventChainItemsWrapperProps> = ({
  children,
}) => {
  return (
    <FlexBlock direction={'column'} gap={6} width={'100%'} overflow={'hidden'}>
      {children}
    </FlexBlock>
  );
};