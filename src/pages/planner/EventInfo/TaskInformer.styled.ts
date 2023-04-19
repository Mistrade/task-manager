import styled from 'styled-components';

export const StyledTaskInformerLinkForm = styled('form')`
  & {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
    width: 100%;
    flex-wrap: nowrap;
  }
`;

export const EventInformerContentContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 12px;
  padding: 0px 20px 12px 20px;
  overflow: hidden;
  z-index: 0;
`;
