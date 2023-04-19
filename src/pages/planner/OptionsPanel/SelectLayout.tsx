import { setPlannerLayout } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { useMemo, useState } from 'react';

import { defaultColor } from '@src/common/constants/constants';
import { SERVICES_NAMES } from '@src/common/constants/enums';
import { getPath } from '@src/common/functions';

import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { LinkSolid } from '@planner/OptionsPanel/ModeSwitch/Item';
import { PlannerHeaderSwitch } from '@planner/OptionsPanel/ModeSwitch/List';
import { SwitchCalendarModeTab } from '@planner/Planner.styled';

export const PlannerSelectLayout = () => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(plannerSelectLayout);
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
                to={getPath(SERVICES_NAMES.PLANNER, item.layout)}
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
