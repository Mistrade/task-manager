import { HTMLProps } from 'react';
import { FlattenSimpleInterpolation, css } from 'styled-components';

import { currentColor, orangeColor } from '../../common/constants/constants';
import { StyledBadge } from './styled';

type BadgeTypes = 'primary' | 'delayed' | 'default';
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
  default: css``,
};

interface BadgeProps extends Omit<HTMLProps<HTMLSpanElement>, 'ref' | 'as'> {
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
