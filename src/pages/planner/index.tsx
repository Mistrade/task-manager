import React, { FC } from 'react';
import Helmet from 'react-helmet';

import { PlannerOptionsPanel } from '@src/pages/planner/Panel';
import { LayoutSelector } from '@src/pages/planner/Routes/LayoutSelector';
import { ModalRoutesMemo } from '@src/pages/planner/Routes/ModalRoutes';
import {
  PlannerContainer,
  PlannerContentContainer,
  PlannerLayoutContainer,
} from '@src/pages/planner/styled';

export const PlannerPage: FC = React.memo(() => {
  return (
    <>
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
          <PlannerOptionsPanel />
          <PlannerLayoutContainer>
            <LayoutSelector />
          </PlannerLayoutContainer>
        </PlannerContentContainer>
        <ModalRoutesMemo />
      </PlannerContainer>
    </>
  );
});
