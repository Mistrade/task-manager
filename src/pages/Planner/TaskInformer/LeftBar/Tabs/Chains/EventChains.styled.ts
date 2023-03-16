import styled from 'styled-components';
import { Badge } from '../../../../../../components/Badge/Badge';
import { darkColor, hoverColor } from '../../../../../../common/constants';

export const TaskChainBadge = styled(Badge)`
  font-size: 15px;
  color: ${darkColor};
  background-color: ${hoverColor};
  padding: 3px 6px;
`;
