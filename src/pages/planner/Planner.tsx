import React, { FC } from 'react';
import { PlannerHeader } from './Header/PlannerHeader';
import { LayoutSelector } from './LayoutSelector';
import { ModalRoutes } from './ModalRoutes';
import { PlannerOptionsPanel } from './OptionsPanel/PlannerOptionsPanel';
import {
  PlannerContainer,
  PlannerContentContainer,
  PlannerLayoutContainer,
  PlannerOptionPanelContainer,
} from './Planner.styled';

export const PlannerPage: FC = React.memo(() => {
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
      <ModalRoutes />
    </PlannerContainer>
  );
});
