import { PlannerProvider } from '@components/ContextProviders/PlannerProvider';
import { PLANNER_LAYOUTS } from '@src/common/constants';
import React, { FC } from 'react';
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
    <PlannerProvider layout={PLANNER_LAYOUTS.MONTH} status={'all'}>
      <PlannerContainer>
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
    </PlannerProvider>
  );
});
