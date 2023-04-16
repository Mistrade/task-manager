import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { currentColor } from '@src/common/constants';


export const LinkStyled = styled(NavLink)<{ fontSize?: number }>`
  border-radius: ${borderRadiusSize.sm};
  font-size: ${(_) => _.fontSize || 14}px;
  color: ${currentColor};
  outline: none;
  text-decoration: none;
  font-family: 'Helvetica Neue', sans-serif;
  line-height: 1.2;
`;