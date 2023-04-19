import { CSSProperties, FC, ReactNode } from 'react';
import { NavLinkProps } from 'react-router-dom';

import { defaultColor } from '@src/common/constants/constants';

import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';

import { PlannerNavLink } from '@planner/styled';

export const LinkSolid: FC<{
  title: ReactNode;
  icon?: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  to: string;
  relative?: NavLinkProps['relative'];
  end?: NavLinkProps['end'];
}> = ({ title, icon, to, style, onClick, end, relative }) => {
  return (
    <PlannerNavLink
      end={end}
      relative={relative}
      style={style}
      to={to}
      onClick={onClick}
      className={({ isActive }) => {
        return isActive ? 'active' : '';
      }}
    >
      <FlexBlock align={'center'} gap={6}>
        {icon}
        <CutText rows={1} color={defaultColor} fontSize={15}>
          {title}
        </CutText>
      </FlexBlock>
    </PlannerNavLink>
  );
};
