import { CenteredContainer } from '@components/AppRoutes/Interceptors/SessionInterceptor';
import { PlannerProvider } from '@components/ContextProviders/PlannerProvider';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { PlannerPage } from '@planner/Planner';
import { EventFilterTaskStatuses } from '@planner/RenderModes/FindEventFilter/find-event-filters.types';
import { ServicesNames } from '@redux/reducers/global';
import {
  DEFAULT_PLANNER_LAYOUT,
  DEFAULT_PLANNER_STATUS,
  PLANNER_LAYOUTS,
  URLTaskStatuses,
} from '@src/common/constants';
import { FC } from 'react';
import { useParams } from 'react-router';

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
            navigate(
              `/${ServicesNames.PLANNER}/${DEFAULT_PLANNER_LAYOUT}/${DEFAULT_PLANNER_STATUS}`
            );
          },
        }}
        errorType={'BAD_REQUEST'}
      />
    </CenteredContainer>
  );
};
