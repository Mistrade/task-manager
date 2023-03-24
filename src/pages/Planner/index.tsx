import { FC, useEffect } from 'react';
import { PlannerMode } from './planner.types';
import { useAppDispatch } from '../../store/hooks/hooks';
import { changePlanner } from '../../store/reducers/planner-reducer';
import { Route, Routes, useParams } from 'react-router-dom';
import { CalendarStatusProxy } from './UrlProxy/CalendarStatusProxy';
import dayjs from 'dayjs';
import { useSearchNavigate } from '../../hooks/useSearchNavigate';
import { ErrorScreen } from '../../components/Errors/ErrorScreen';
import { CenteredContainer } from '../../components/AppRoutes/Interceptors/SessionInterceptor';

const layouts: Array<PlannerMode['layout']> = [
  'day',
  'week',
  'month',
  'year',
  'list',
  'favorites',
];

export const PlannerController: FC = () => {
  const { layout } = useParams<{ layout: PlannerMode['layout'] }>();
  const dispatch = useAppDispatch();
  const navigate = useSearchNavigate();

  useEffect(() => {
    if (layout && isCorrectLayout(layout)) {
      if (layout === 'list') {
        dispatch(
          changePlanner({
            layout,
            date: {
              layout: 'list',
              fromDate: dayjs().startOf('date').toString(),
              toDate: dayjs().add(31, 'day').endOf('date').toString(),
            },
          })
        );
      } else {
        dispatch(changePlanner({ layout, date: new Date().toString() }));
      }
    }
  }, []);

  const isCorrectLayout = (l: PlannerMode['layout'] | undefined) => {
    return l && layouts.includes(l);
  };

  if (isCorrectLayout(layout) && layout) {
    return (
      <Routes>
        <Route
          path={':taskStatus/*'}
          element={<CalendarStatusProxy layout={layout} />}
        />
      </Routes>
    );
  }

  return (
    <CenteredContainer>
      <ErrorScreen
        title={'Такого URL не существует'}
        description={
          'В адресной строке допущена ошибка относительно режима отображения событий. Нажмите на кнопку ниже, если вы хотели попасть в "Планировщик"'
        }
        errorType={'SYSTEM_ERROR'}
        action={{
          title: 'Перейти к планировщику',
          onClick: () => navigate('/planner/day/all', { replace: true }),
        }}
      />
    </CenteredContainer>
  );
};
