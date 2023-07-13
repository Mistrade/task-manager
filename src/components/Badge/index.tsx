import {
  currentColor,
  darkColor,
  greenColor,
  orangeColor,
  redColor,
} from '../../common/constants/constants';
import { StyledBadge } from './styled';
import { FINANCE_OPERATION_TYPES } from '@api/finance-api/types';
import { HTMLProps } from 'react';
import { css, FlattenSimpleInterpolation } from 'styled-components';


type BadgeTypes = 'primary' | 'delayed' | 'default' | FINANCE_OPERATION_TYPES;
type TBadgeConfig = {
  [key in BadgeTypes]: FlattenSimpleInterpolation;
};
const BadgesConfig: TBadgeConfig = {
  primary: css`
    color: #fff;
    background-color: ${currentColor};
  `,
  delayed: css`
    color: #fff;
    background-color: ${orangeColor};
  `,
  income: css`
    color: ${darkColor};
    background-color: ${greenColor};
  `,
  consumption: css`
    color: ${darkColor};
    background-color: ${redColor};
  `,
  default: css``,
};

export interface BadgeProps
  extends Omit<HTMLProps<HTMLSpanElement>, 'ref' | 'as'> {
  type?: BadgeTypes;
  isInteractive?: boolean;
}

function Badge({
  type = 'default',
  children,
  ...htmlProps
}: BadgeProps): JSX.Element {
  return (
    <StyledBadge {...htmlProps} css={BadgesConfig[type]}>
      {children}
    </StyledBadge>
  );
}

export { Badge as default };