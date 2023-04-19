import React, { FC } from 'react';

import { disableReRender } from '@src/common/utils/react-utils';

import { LayoutAccordion } from '@components/Accordion/LayoutAccordion';
import { FlexBlock } from '@components/LayoutComponents';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';
import { CutText } from '@components/Text/Text';

import { GroupList } from '@planner/Groups/GroupList';
import { OptionPanelCalendar } from '@planner/OptionsPanel/Calendar';
import { CalendarCurrentTitle } from '@planner/OptionsPanel/CalendarCurrentTitle';
import { PlannerSelectLayout } from '@planner/OptionsPanel/SelectLayout';
import { DaySettingsPanelProps } from '@planner/planner.types';

export const PlannerOptionsPanel: FC<DaySettingsPanelProps> = React.memo(
  ({}) => {
    return (
      <VerticalScroll
        gap={12}
        renderPattern={'top-bottom'}
        placementStatic={'top'}
        staticContent={
          <FlexBlock direction={'column'} gap={12}>
            <PlannerSelectLayout />
            <CalendarCurrentTitle />
            <OptionPanelCalendar />
          </FlexBlock>
        }
      >
        <FlexBlock gap={12} direction={'column'}>
          <LayoutAccordion
            initialState={false}
            type={'info'}
            title={
              <CutText rows={1} fontSize={16}>
                Группы событий:
              </CutText>
            }
          >
            <VerticalScroll
              renderPattern={'top-bottom'}
              containerProps={{ maxHeight: 220 }}
            >
              <GroupList />
            </VerticalScroll>
          </LayoutAccordion>
        </FlexBlock>
      </VerticalScroll>
    );
  },
  disableReRender
);
