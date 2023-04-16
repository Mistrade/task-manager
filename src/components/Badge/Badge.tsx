import styled from 'styled-components';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import {
  currentColor,
  defaultColor,
  pageHeaderColor,
} from '@src/common/constants';


export const Badge = styled('span')`
  line-height: 1;
  padding: 2px 4px;
  border-radius: ${borderRadiusSize.xs};
  font-size: 15px;
  color: ${defaultColor};
  background-color: ${pageHeaderColor};
`;

export const TimeBadge = styled(Badge)`
  color: #fff;
  background-color: ${currentColor};
`;