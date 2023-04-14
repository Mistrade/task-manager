import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { GroupList } from '@planner/Groups/GroupList';
import { CalendarCurrentTitle } from '@planner/Header/CalendarCurrentTitle';
import { OptionPanelCalendar } from '@planner/OptionsPanel/Calendar';
import { PlannerSelectLayout } from '@planner/OptionsPanel/SelectLayout';
import { TimeZone } from '@planner/OptionsPanel/TimeZone';
import { DaySettingsPanelProps } from '@planner/planner.types';
import { disableReRender } from '@src/common/utils/react-utils';
import React, { FC } from 'react';

export const PlannerOptionsPanel: FC<DaySettingsPanelProps> = React.memo(
  ({}) => {
    return (
      <ScrollVerticalView
        gap={24}
        renderPattern={'top-bottom'}
        placementStatic={'top'}
        staticContent={
          <FlexBlock direction={'column'} gap={20}>
            <PlannerSelectLayout />
            <CalendarCurrentTitle />
          </FlexBlock>
        }
      >
        <FlexBlock gap={24} direction={'column'}>
          <OptionPanelCalendar />
          <TimeZone />
          <GroupList />
        </FlexBlock>
      </ScrollVerticalView>
    );
  },
  disableReRender
);
