import React, { FC } from 'react';

import { disableReRender } from '@src/common/utils/react-utils';

import { LayoutAccordion } from '@components/Accordion/LayoutAccordion';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';

import { GroupList } from '@planner/Groups/GroupList';
import { CalendarCurrentTitle } from '@planner/Header/CalendarCurrentTitle';
import { OptionPanelCalendar } from '@planner/OptionsPanel/Calendar';
import { PlannerSelectLayout } from '@planner/OptionsPanel/SelectLayout';
import { CutText } from '@planner/RenderModes/DayCalendar/TaskList/TaskList.styled';
import { DaySettingsPanelProps } from '@planner/planner.types';

export const PlannerOptionsPanel: FC<DaySettingsPanelProps> = React.memo(
  ({}) => {
    return (
      <ScrollVerticalView
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
            <ScrollVerticalView
              renderPattern={'top-bottom'}
              containerProps={{ maxHeight: 220 }}
            >
              <GroupList />
            </ScrollVerticalView>
          </LayoutAccordion>
        </FlexBlock>
      </ScrollVerticalView>
    );
  },
  disableReRender
);
