import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { currentColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

export const LinkStyled = styled(NavLink)<{ fontSize?: number }>`
  border-radius: ${borderRadiusSize.sm};
  font-size: ${(_) => _.fontSize || 14}px;
  color: ${currentColor};
  outline: none;
  text-decoration: none;
  font-family: 'Helvetica Neue', sans-serif;
  line-height: 1.2;
`;
