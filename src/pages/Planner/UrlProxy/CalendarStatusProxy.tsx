import { PlannerMode } from '../planner.types';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { changeEventStatuses } from '../../../store/reducers/planner-reducer';
import { PlannerPage } from '../Planner';
import { EventFilterTaskStatuses } from '../RenderModes/FindEventFilter/find-event-filters.types';
import { URLTaskStatuses } from '../../../common/constants';
import { ErrorScreen } from '../../../components/Errors/ErrorScreen';
import { CenteredContainer } from '../../../components/AppRoutes/Interceptors/SessionInterceptor';
import { useSearchNavigate } from '../../../hooks/useSearchNavigate';

export const CalendarStatusProxy: FC<{ layout: PlannerMode['layout'] }> = ({
  layout,
}) => {
  const { taskStatus } = useParams<{ taskStatus: EventFilterTaskStatuses }>();
  const dispatch = useAppDispatch();
  const navigate = useSearchNavigate();

  const isCorrectTaskStatus = (status: EventFilterTaskStatuses | undefined) => {
    return status && URLTaskStatuses[status];
  };

  useEffect(() => {
    if (taskStatus && !isCorrectTaskStatus(taskStatus)) {
      dispatch(changeEventStatuses(taskStatus));
    }
  }, []);

  if (taskStatus && isCorrectTaskStatus(taskStatus)) {
    return <PlannerPage layout={layout} taskStatus={taskStatus} />;
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
          onClick: () => navigate('/planner/day/all'),
        }}
        errorType={'BAD_REQUEST'}
      />
    </CenteredContainer>
  );
};
