import styled from 'styled-components';

import { lightHoverColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { pxToCssValue } from '@components/LayoutComponents/FlexBlock';

export const GroupListStyled = styled('ul')`
  margin: 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: transparent;
  width: 100%;
  gap: 8px;

  & li {
    list-style: none;
    width: 100%;
    background-color: transparent;
    padding: 2px 4px;
    border-radius: ${borderRadiusSize.xs};
    transition: all 0.3s ease-in;
  }

  & li:hover {
    background-color: ${lightHoverColor};
  }
`;

export const GroupLogo = styled('div')<{ color: string; size?: number }>`
  flex-grow: 0;
  flex-shrink: 0;
  width: ${(_) => (_.size ? pxToCssValue(_.size) : '20px')};
  height: ${(_) => (_.size ? pxToCssValue(_.size) : '20px')};
  border-radius: ${borderRadiusSize.xs};
  background-color: ${(_) => _.color};
`;
