import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { setPlannerLayout } from '@planner-reducer/index';
import { PlannerNavLink } from '@planner/Planner.styled';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectStatus } from '@selectors/planner';
import { PLANNER_LAYOUTS } from '@src/common/constants';
import { memo, ReactNode, useCallback } from 'react';

export const CalendarModeSwitchItem = memo<{
  title: ReactNode;
  icon: ReactNode;
  layout: PLANNER_LAYOUTS;
}>(
  ({ title, icon, layout }) => {
    const status = useAppSelector(plannerSelectStatus);
    const dispatch = useAppDispatch();

    const clickHandler = useCallback(() => {
      dispatch(setPlannerLayout(layout));
    }, [layout]);

    return (
      <PlannerNavLink
        to={`/planner/${layout}/${status}`}
        onClick={clickHandler}
        className={({ isActive }) => {
          return isActive ? 'active' : '';
        }}
      >
        <FlexBlock align={'center'} gap={6}>
          {icon}
          {title}
        </FlexBlock>
      </PlannerNavLink>
    );
  },
  (prevProps, nextProps) => prevProps.layout === nextProps.layout
);
