import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { PlannerNavLink } from '@planner/Planner.styled';
import { CutText } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';
import { defaultColor } from '@src/common/constants';
import { CSSProperties, FC, ReactNode } from 'react';

export const LinkSolid: FC<{
  title: ReactNode;
  icon?: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  to: string;
}> = ({ title, icon, to, style, onClick }) => {
  return (
    <PlannerNavLink
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
