import styled from 'styled-components';

export const FriendItemContainer = styled('div')`
  & {
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    gap: 12px;
  }
`;

export const FriendItemContentContainer = styled('div')`
  & {
    display: flex;
    flex-direction: column;
    flex: 1 0 100%;
  }
`;