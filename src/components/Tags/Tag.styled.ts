import styled from 'styled-components';

import { defaultColor, disabledColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';


export const TagStyled = styled('span')`
  & {
    display: flex;
    align-items: center;
    padding: 4px 6px;
    background-color: ${disabledColor};
    color: ${defaultColor};
    border-radius: ${borderRadiusSize.sm};
    gap: 4px;
  }
`;