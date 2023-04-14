import { CalendarIcon } from '@components/Icons/AppIcon/CalendarIcon';
import { ListIcon } from '@components/Icons/AppIcon/ListIcon';
import { StarIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { CalendarModeSwitchItem } from '@planner/Header/ModeSwitch/Item';
import { currentColor, PLANNER_LAYOUTS } from '@src/common/constants';
import React, { FC, ReactNode } from 'react';

export interface PlannerHeaderSwitchObject {
  title: string;
  icon: ReactNode;
  layout: PLANNER_LAYOUTS;
}

export const PlannerHeaderSwitch: {
  [key in PLANNER_LAYOUTS]: PlannerHeaderSwitchObject;
} = {
  [PLANNER_LAYOUTS.DAY]: {
    title: 'Дневной режим',
    icon: <ListIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.DAY,
  },
  [PLANNER_LAYOUTS.WEEK]: {
    title: 'Недельный режим',
    icon: <CalendarIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.WEEK,
  },
  [PLANNER_LAYOUTS.MONTH]: {
    title: 'Месячный режим',
    icon: <CalendarIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.MONTH,
  },
  [PLANNER_LAYOUTS.YEAR]: {
    title: 'Годовой режим',
    icon: <CalendarIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.YEAR,
  },
  [PLANNER_LAYOUTS.LIST]: {
    title: 'Режим 3 дня (TODO)',
    icon: <ListIcon size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.LIST,
  },
  [PLANNER_LAYOUTS.FAVORITES]: {
    title: 'Режим Избранное (TODO)',
    icon: <StarIcon fillColor={currentColor} size={24} color={currentColor} />,
    layout: PLANNER_LAYOUTS.FAVORITES,
  },
};

export const CalendarModeSwitchers: FC = React.memo(() => {
  return (
    <FlexBlock width={'100%'} align={'flex-end'} justify={'center'}>
      {Object.values(PlannerHeaderSwitch).map((item) => (
        <CalendarModeSwitchItem key={item.layout} {...item} />
      ))}
    </FlexBlock>
  );
});
