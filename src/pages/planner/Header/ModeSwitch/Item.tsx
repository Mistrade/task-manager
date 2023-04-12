import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { setPlannerLayout } from '@planner-reducer/index';
import { SwitchCalendarModeTab } from '@planner/Planner.styled';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { ServicesNames } from '@redux/reducers/global';
import { plannerSelectLayout, plannerSelectStatus } from '@selectors/planner';
import { PLANNER_LAYOUTS } from '@src/common/constants';
import { memo, ReactNode, useCallback, useMemo } from 'react';

export const CalendarModeSwitchItem = memo<{
  title: ReactNode;
  icon: ReactNode;
  layout: PLANNER_LAYOUTS;
}>(
  ({ title, icon, layout }) => {
    const stateLayout = useAppSelector(plannerSelectLayout);
    const status = useAppSelector(plannerSelectStatus);
    const navigate = useSearchNavigate();
    const dispatch = useAppDispatch();

    const isSelected = useMemo(() => {
      return layout === stateLayout;
    }, [layout, stateLayout]);

    const clickHandler = useCallback(() => {
      if (!isSelected) {
        dispatch(setPlannerLayout(layout));
        navigate(`/${ServicesNames.PLANNER}/${layout}/${status}`);
      }
    }, [layout, isSelected]);

    return (
      <SwitchCalendarModeTab isSelected={isSelected} onClick={clickHandler}>
        <FlexBlock align={'center'} gap={6}>
          {icon}
          {title}
        </FlexBlock>
      </SwitchCalendarModeTab>
    );
  },
  (prevProps, nextProps) => prevProps.layout === nextProps.layout
);
