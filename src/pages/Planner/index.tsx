import { FC, useEffect } from 'react';
import { PlannerMode } from './planner.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { changePlanner } from '../../store/reducers/planner-reducer';
import { Route, Routes, useParams } from 'react-router-dom';
import { CalendarStatusProxy } from './UrlProxy/CalendarStatusProxy';
import { useLocation } from 'react-router';
import dayjs from 'dayjs';
import { useSearchNavigate } from '../../hooks/useSearchNavigate';
import { ErrorScreen } from '../../components/Errors/ErrorScreen';

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
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useSearchNavigate();
  const { statuses } = useAppSelector((state) => state.planner);

  useEffect(() => {
    if (!layout || !isCorrectLayout(layout)) {
      navigate(`/planner/day/${statuses}`, { replace: true });
    } else {
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

      const pathArray = pathname.split('/').filter(Boolean);
      if (pathArray.length <= 2) {
        navigate(`/planner/${layout}/${statuses}`, { replace: true });
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
    <ErrorScreen
      title={'Такого URL не существует'}
      errorType={'SYSTEM_ERROR'}
    />
  );
};
