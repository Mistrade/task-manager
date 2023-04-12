import React, { FC, useContext } from 'react';
import { SwitchCalendarModeTab } from '@planner/Planner.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { currentColor, PLANNER_LAYOUTS } from '@src/common/constants';
import { StarsListIcon } from '@components/Icons/AppIcon/StarsListIcon';
import { ListIcon } from '@components/Icons/AppIcon/ListIcon';
import { CalendarIcon } from '@components/Icons/AppIcon/CalendarIcon';
import { PlannerContext } from '@src/Context/planner.context';

export const CalendarModeSwitchers: FC = React.memo(() => {
  const {
    methods: { updateCurrentLayoutAndNavigate },
    currentLayout,
  } = useContext(PlannerContext);

  return (
    <FlexBlock width={'100%'} align={'flex-end'} justify={'center'}>
      <SwitchCalendarModeTab
        isSelected={currentLayout === PLANNER_LAYOUTS.DAY}
        onClick={() => updateCurrentLayoutAndNavigate(PLANNER_LAYOUTS.DAY)}
      >
        <FlexBlock align={'center'} gap={6}>
          <ListIcon size={24} color={currentColor} />
          День
        </FlexBlock>
      </SwitchCalendarModeTab>
      <SwitchCalendarModeTab
        onClick={() => updateCurrentLayoutAndNavigate(PLANNER_LAYOUTS.WEEK)}
        isSelected={currentLayout === PLANNER_LAYOUTS.WEEK}
      >
        <FlexBlock align={'center'} gap={6}>
          <CalendarIcon size={24} color={currentColor} />
          Неделя
        </FlexBlock>
      </SwitchCalendarModeTab>
      <SwitchCalendarModeTab
        onClick={() => updateCurrentLayoutAndNavigate(PLANNER_LAYOUTS.MONTH)}
        isSelected={currentLayout === PLANNER_LAYOUTS.MONTH}
      >
        <FlexBlock align={'center'} gap={6}>
          <CalendarIcon size={24} color={currentColor} />
          Месяц
        </FlexBlock>
      </SwitchCalendarModeTab>
      <SwitchCalendarModeTab
        isSelected={currentLayout === PLANNER_LAYOUTS.YEAR}
        onClick={() => updateCurrentLayoutAndNavigate(PLANNER_LAYOUTS.YEAR)}
      >
        <FlexBlock align={'center'} gap={6}>
          <CalendarIcon size={24} color={currentColor} />
          Год
        </FlexBlock>
      </SwitchCalendarModeTab>
      <SwitchCalendarModeTab
        isSelected={currentLayout === PLANNER_LAYOUTS.LIST}
        onClick={() => updateCurrentLayoutAndNavigate(PLANNER_LAYOUTS.LIST)}
      >
        <FlexBlock align={'center'} gap={6}>
          <ListIcon size={24} color={currentColor} />
          Список
        </FlexBlock>
      </SwitchCalendarModeTab>
      <SwitchCalendarModeTab
        isSelected={currentLayout === PLANNER_LAYOUTS.FAVORITES}
        onClick={() =>
          updateCurrentLayoutAndNavigate(PLANNER_LAYOUTS.FAVORITES)
        }
      >
        <FlexBlock align={'center'} gap={6}>
          <StarsListIcon size={24} color={currentColor} />
          Избранное
        </FlexBlock>
      </SwitchCalendarModeTab>
    </FlexBlock>
  );
});
