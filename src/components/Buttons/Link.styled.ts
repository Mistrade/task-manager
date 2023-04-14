import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { currentColor } from '@src/common/constants';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LinkStyled = styled(NavLink)`
  border-radius: ${borderRadiusSize.sm};
  font-size: 14px;
  color: ${currentColor};
  outline: none;
  text-decoration: none;
  font-family: 'Helvetica Neue', sans-serif;
  line-height: 1.2;

  &:hover {
    text-decoration: ${currentColor} underline;
  }
`;
