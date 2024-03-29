import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate, plannerSelectLayout } from '@selectors/planner';
import React, { useMemo } from 'react';

import { getCalendarTitle } from '@src/common/functions';
import { disableReRender } from '@src/common/utils/react-utils';

import { FlexBlock } from '@components/LayoutComponents';

import { CalendarTitle } from '@planner/styled';

export const PanelDateHeader = React.memo(() => {
  const date = useAppSelector(plannerSelectDate);
  const layout = useAppSelector(plannerSelectLayout);

  const title: string = useMemo(
    () => getCalendarTitle(layout, plannerDateToDate(date)),
    [layout, date]
  );

  return (
    <FlexBlock justify={'center'} fSize={20}>
      <CalendarTitle>{title}</CalendarTitle>
    </FlexBlock>
  );
}, disableReRender);
