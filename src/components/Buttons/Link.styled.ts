import { borderRadiusSize } from '@src/common/css/mixins';
import { kitColors } from 'chernikov-kit';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


export const LinkStyled = styled(NavLink)<{ fontSize?: number }>`
  border-radius: ${borderRadiusSize.sm};
  font-size: ${(_) => _.fontSize || 14}px;
  color: ${kitColors.primary};
  outline: none;
  text-decoration: none;
  font-family: 'Helvetica Neue', sans-serif;
  line-height: 1.2;
`;