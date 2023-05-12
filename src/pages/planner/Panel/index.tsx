import React, { FC } from 'react';

import { disableReRender } from '@src/common/utils/react-utils';

import { LayoutAccordion } from '@components/Accordion/LayoutAccordion';
import { FlexBlock } from '@components/LayoutComponents';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';
import { CutText } from '@components/Text/Text';

import { GroupList } from '@planner/Groups';
import { OptionPanelCalendar } from '@planner/Panel/Calendar';
import { CalendarCurrentTitle } from '@planner/Panel/CalendarCurrentTitle';
import { PlannerSelectLayout } from '@planner/Panel/SelectLayout';
import { DaySettingsPanelProps } from '@planner/types';

import { CalendarTodaySwitchers } from './CalendarTodaySwitchers';

export const PlannerOptionsPanel: FC<DaySettingsPanelProps> = React.memo(() => {
  return (
    <FlexBlock direction={'column'} gap={12}>
      <PlannerSelectLayout />
      <CalendarCurrentTitle />
      <FlexBlock mt={12} justify={'center'} width={'100%'} p={`3px 12px`}>
        <CalendarTodaySwitchers />
      </FlexBlock>
      <OptionPanelCalendar />
      <FlexBlock gap={12} direction={'column'} width={'100%'}>
        <LayoutAccordion
          initialState={true}
          type={'info'}
          title={
            <CutText rows={1} fontSize={16}>
              Группы событий:
            </CutText>
          }
        >
          <VerticalScroll
            renderPattern={'top-bottom'}
            containerProps={{ maxHeight: 220, width: '100%' }}
          >
            <GroupList />
          </VerticalScroll>
        </LayoutAccordion>
      </FlexBlock>
    </FlexBlock>
  );
}, disableReRender);
