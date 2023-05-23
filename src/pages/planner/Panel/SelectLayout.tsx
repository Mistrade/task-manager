import { setPlannerLayout } from '@planner-reducer/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { FC, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

import { defaultColor } from '@src/common/constants/constants';
import { SERVICES_NAMES } from '@src/common/constants/enums';
import { getPath } from '@src/common/functions';

import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { LinkSolid } from '@planner/Panel/ModeSwitch/Item';
import { PlannerHeaderSwitch } from '@planner/Panel/ModeSwitch/List';
import { SwitchCalendarModeTab } from '@planner/styled';

export const PlannerSelectLayout: FC<{ pattern: 'short' | 'full' }> = ({
  pattern,
}) => {
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
  const location = useLocation();

  return (
    <Tooltip
      theme={'light'}
      placement={pattern === 'short' ? 'right-start' : 'bottom'}
      visible={isOpen}
      onClickOutside={() => setIsOpen(false)}
      delay={[100, 200]}
      interactive={true}
      interactiveBorder={20}
      maxWidth={285}
      containerStyles={{
        width: 'inherit',
      }}
      content={
        <SelectListContainer>
          {filteredArr.map((item) => (
            <LinkSolid
              to={[
                getPath(SERVICES_NAMES.PLANNER, item.layout),
                location.search,
              ].join('')}
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
      }
    >
      <SwitchCalendarModeTab
        isSelected={true}
        style={{
          width: '100%',
          height: 40,
          padding: pattern === 'short' ? 0 : undefined,
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FlexBlock
          direction={'row'}
          wrap={'nowrap'}
          gap={6}
          align={'center'}
          width={'100%'}
          justify={pattern === 'short' ? 'center' : 'flex-start'}
        >
          {selected.icon}
          {pattern === 'full' && (
            <CutText rows={1} color={defaultColor} fontSize={15}>
              {selected.title}
            </CutText>
          )}
        </FlexBlock>
      </SwitchCalendarModeTab>
    </Tooltip>
  );
};
