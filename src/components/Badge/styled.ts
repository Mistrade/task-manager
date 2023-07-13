import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

import { defaultColor, pageHeaderColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

export const StyledBadge = styled('span')<{
  css?: FlattenSimpleInterpolation;
  isInteractive?: boolean;
}>`
  line-height: 1;
  padding: 2px 4px;
  border-radius: ${borderRadiusSize.xs};
  font-size: 15px;
  color: ${defaultColor};
  background-color: ${pageHeaderColor};
  ${(_) => _.css}
  ${(_) =>
    _.isInteractive
      ? css`
          cursor: pointer;
        `
      : ''}
`;
