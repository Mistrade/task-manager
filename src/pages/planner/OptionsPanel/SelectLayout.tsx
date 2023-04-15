import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Tooltip } from '@components/Tooltip/Tooltip';
import { setPlannerLayout } from '@planner-reducer/index';
import { LinkSolid } from '@planner/Header/ModeSwitch/Item';
import { PlannerHeaderSwitch } from '@planner/Header/ModeSwitch/List';
import { SwitchCalendarModeTab } from '@planner/Planner.styled';
import { CutText } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { ServicesNames } from '@redux/reducers/global';
import { plannerSelectLayout, plannerSelectStatus } from '@selectors/planner';
import { defaultColor } from '@src/common/constants';
import { getPath } from '@src/common/functions';
import { useMemo, useState } from 'react';

export const PlannerSelectLayout = () => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(plannerSelectLayout);
  const status = useAppSelector(plannerSelectStatus);
  const selected = useMemo(() => {
    return PlannerHeaderSwitch[layout];
  }, [layout]);

  const filteredArr = useMemo(() => {
    return Object.values(PlannerHeaderSwitch).filter(
      (item) => item.layout !== layout
    );
  }, [layout]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip
      theme={'light'}
      placement={'bottom'}
      arrow={false}
      visible={isOpen}
      onClickOutside={() => setIsOpen(false)}
      delay={[100, 200]}
      interactive={true}
      interactiveBorder={20}
      maxWidth={285}
      content={
        isOpen && (
          <SelectListContainer>
            {filteredArr.map((item) => (
              <LinkSolid
                to={getPath(ServicesNames.PLANNER, item.layout, status)}
                style={{ width: '100%' }}
                key={item.layout}
                title={item.title}
                icon={item.icon}
                onClick={() => {
                  setIsOpen(false);
                  dispatch(setPlannerLayout(item.layout));
                }}
              />
            ))}
          </SelectListContainer>
        )
      }
    >
      <SwitchCalendarModeTab
        isSelected={true}
        style={{ width: '100%', height: 40 }}
        onClick={() => setIsOpen(true)}
      >
        <FlexBlock direction={'row'} wrap={'nowrap'} gap={6} align={'center'}>
          {selected.icon}
          <CutText rows={1} color={defaultColor} fontSize={15}>
            {selected.title}
          </CutText>
        </FlexBlock>
      </SwitchCalendarModeTab>
    </Tooltip>
  );
};
