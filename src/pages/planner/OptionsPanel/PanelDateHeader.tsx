import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { plannerDateToDate } from '@planner-reducer/utils';
import { CalendarTitle } from '@planner/Planner.styled';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectDate, plannerSelectLayout } from '@selectors/planner';
import { getCalendarTitle } from '@src/common/functions';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { useMemo } from 'react';

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
