import { CalendarIcon } from '@components/Icons/AppIcon/CalendarIcon';
import { ListIcon } from '@components/Icons/AppIcon/ListIcon';
import { StarsListIcon } from '@components/Icons/AppIcon/StarsListIcon';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { CalendarModeSwitchItem } from '@planner/Header/ModeSwitch/Item';
import { currentColor, PLANNER_LAYOUTS } from '@src/common/constants';
import React, { FC } from 'react';

const SwitchArr = [
  {
    title: 'День',
    icon: <ListIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.DAY,
  },
  {
    title: 'Неделя',
    icon: <CalendarIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.WEEK,
  },
  {
    title: 'Месяц',
    icon: <CalendarIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.MONTH,
  },
  {
    title: 'Год',
    icon: <CalendarIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.YEAR,
  },
  {
    title: '3 дня',
    icon: <ListIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.LIST,
  },
  {
    title: 'Избранное',
    icon: <StarsListIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.FAVORITES,
  },
];

export const CalendarModeSwitchers: FC = React.memo(() => {
  return (
    <FlexBlock width={'100%'} align={'flex-end'} justify={'center'}>
      {SwitchArr.map((item) => (
        <CalendarModeSwitchItem key={item.layout} {...item} />
      ))}
    </FlexBlock>
  );
});
