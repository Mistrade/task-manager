import React, { FC } from 'react';
import { PlannerHeader } from './Header/PlannerHeader';
import { PlannerOptionsPanel } from './OptionsPanel/PlannerOptionsPanel';
import {
  PlannerContainer,
  PlannerContentContainer,
  PlannerLayoutContainer,
  PlannerOptionPanelContainer,
} from './Planner.styled';
import { LayoutSelector } from './LayoutSelector';
import { ModalRoutes } from './ModalRoutes';

export const PlannerPage: FC = () => {
  return (
    <PlannerContainer>
      <PlannerHeader />
      <PlannerContentContainer>
        <PlannerOptionPanelContainer>
          <PlannerOptionsPanel />
        </PlannerOptionPanelContainer>
        <PlannerLayoutContainer>
          <LayoutSelector />
        </PlannerLayoutContainer>
      </PlannerContentContainer>
      {/*<RemoveGroupHock*/}
      {/*  groupInfo={calendar.groupRemoved}*/}
      {/*  onClose={() => calendar.onSelectRemovedGroup(null)}*/}
      {/*  onSuccess={() => calendar.onSelectRemovedGroup(null)}*/}
      {/*/>*/}
      <ModalRoutes />
    </PlannerContainer>
  );
};
