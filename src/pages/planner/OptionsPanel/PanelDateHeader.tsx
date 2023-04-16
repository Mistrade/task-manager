import { plannerDateToDate } from '@planner-reducer/utils';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate, plannerSelectLayout } from '@selectors/planner';
import React, { useMemo } from 'react';

import { getCalendarTitle } from '@src/common/functions';
import { disableReRender } from '@src/common/utils/react-utils';

import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { CalendarTitle } from '@planner/Planner.styled';


export const PanelDateHeader = React.memo(() => {
  const date = useAppSelector(plannerSelectDate);
  const layout = useAppSelector(plannerSelectLayout);

  const title: string = useMemo(
    () => getCalendarTitle(layout, plannerDateToDate(date)),
    [layout, date]
  );

  return (
    <FlexBlock justify={'center'} width={'100%'} p={`3px 12px`} fSize={20}>
      <CalendarTitle>{title}</CalendarTitle>
    </FlexBlock>
  );
}, disableReRender);