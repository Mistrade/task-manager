import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { FC } from 'react';
import { useParams } from 'react-router';

import {
  DEFAULT_PLANNER_LAYOUT,
  PLANNER_LAYOUTS,
  SERVICES_NAMES,
  URLTaskStatuses,
} from '@src/common/constants';

import { CenteredContainer } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { PlannerProvider } from '@components/ContextProviders/PlannerProvider';
import { ErrorScreen } from '@components/Errors/ErrorScreen';

import { PlannerPage } from '@planner/Planner';
import { EventFilterTaskStatuses } from '@planner/RenderModes/FindEventFilter/find-event-filters.types';

export const CalendarStatusProxy: FC<{ layout: PLANNER_LAYOUTS }> = ({
  layout,
}) => {
  const navigate = useSearchNavigate();

  const { taskStatus } = useParams<{ taskStatus: EventFilterTaskStatuses }>();

  const isCorrectTaskStatus = (status: EventFilterTaskStatuses | undefined) => {
    return status && URLTaskStatuses[status];
  };

  if (taskStatus && isCorrectTaskStatus(taskStatus)) {
    return (
      <PlannerProvider layout={layout} status={taskStatus}>
        <PlannerPage />
      </PlannerProvider>
    );
  }

  return (
    <CenteredContainer>
      <ErrorScreen
        title={'Такой страницы не существует'}
        description={
          'Вы пытаетесь открыть страницу, которой не существует, нажмите на кнопку ниже, чтобы перейти к сервису "Планировщик"'
        }
        action={{
          title: `Перейти в "Планировщик"`,
          onClick: () => {
            navigate(`/${SERVICES_NAMES.PLANNER}/${DEFAULT_PLANNER_LAYOUT}`);
          },
        }}
        errorType={'BAD_REQUEST'}
      />
    </CenteredContainer>
  );
};
