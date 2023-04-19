import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectStatus } from '@selectors/planner';
import React, { FC, ReactNode } from 'react';

import { currentColor } from '@src/common/constants/constants';
import { PLANNER_LAYOUTS, SERVICES_NAMES } from '@src/common/constants/enums';
import { getPath } from '@src/common/functions';

import { CalendarIcon } from '@components/Icons/AppIcon/CalendarIcon';
import { ListIcon } from '@components/Icons/AppIcon/ListIcon';
import { StarIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents';

import { LinkSolid } from '@planner/OptionsPanel/ModeSwitch/Item';

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
  const status = useAppSelector(plannerSelectStatus);
  return (
    <FlexBlock width={'100%'} align={'flex-end'} justify={'center'}>
      {Object.values(PlannerHeaderSwitch).map((item) => (
        <LinkSolid
          key={item.layout}
          {...item}
          to={getPath(SERVICES_NAMES.PLANNER, item.layout, status)}
        />
      ))}
    </FlexBlock>
  );
});
