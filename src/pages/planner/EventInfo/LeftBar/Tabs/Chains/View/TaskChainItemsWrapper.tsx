import { FC } from 'react';
import styled from 'styled-components';

import { EventChainItemsWrapperProps } from '../event-chains.types';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  overflow: hidden;
`;

export const TaskChainItemsWrapper: FC<EventChainItemsWrapperProps> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};
