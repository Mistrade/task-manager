import { borderRadiusSize } from '@src/common/borderRadiusSize';
import styled from 'styled-components';
import { SwitchCalendarMode } from '@planner/Planner.styled';

export const InputActionsStyledContainer = styled('div')`
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
  padding-left: 8px;
  padding-right: 8px;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export interface InputActionsStyledItemProps {
  withDelete?: boolean;
}

export const InputActionStyledItem = styled(
  SwitchCalendarMode
)<InputActionsStyledItemProps>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  margin: 0;
`;

export const InputActionDeleteElementContainer = styled('span')`
  padding: 2px 4px;
  border-radius: ${borderRadiusSize.xs};

  &:hover {
    background-color: #fff;
  }
`;
