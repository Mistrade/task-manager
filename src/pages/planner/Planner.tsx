import React, { FC } from 'react';
import Helmet from 'react-helmet';

import { PLANNER_LAYOUTS } from '@src/common/constants';

import { PlannerProvider } from '@components/ContextProviders/PlannerProvider';

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
      <Helmet
        title={'Мои дела'}
        meta={[
          {
            name: 'description',
            content:
              'White Planner - сервис для онлайн планирования личных и рабочих дел, задач, событий, ивентов. Разделяйте их на группы, приглашайте друзей к заданиям, планируйте с удовольствием!',
          },
          {
            property: 'og:title',
            content:
              'Сервис удобного и легкого планирования личных и рабочих дел, задач, событий и не только.',
          },
        ]}
      />
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
