import styled from 'styled-components';

import { darkColor, hoverColor } from '@src/common/constants/constants';

import { Badge } from '@components/Badge/Badge';


export const TaskChainBadge = styled(Badge)`
  font-size: 15px;
  color: ${darkColor};
  background-color: ${hoverColor};
  padding: 3px 6px;
`;