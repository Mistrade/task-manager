import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import styled from 'styled-components';
import { disabledColor } from '@src/common/constants';

export const CalendarHeaderContainer = styled(FlexBlock)`
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0;
  width: 100%;
  gap: 20px;
  background-color: ${'#fff'};
  padding: 16px 24px 0px 24px;
  // border-bottom: 1px solid ${disabledColor};
`;
